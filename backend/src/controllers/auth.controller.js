import crypto from 'crypto';
import { prisma } from '../config/db.js';
import { sendMail } from '../config/mailer.js';
import { env } from '../config/env.js';
import {
  AppError,
  asyncHandler,
  sendSuccess,
  hashPassword,
  comparePassword,
  hashToken,
  compareToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/helpers.js';

// Helper to strip sensitive fields
const sanitizeUser = (user) => {
  const { passwordHash, refreshToken, emailVerificationToken, ...safe } = user;
  return safe;
};

// 1. Sign Up
export const signup = asyncHandler(async (req, res) => {
  const { employeeId, email, password, role = 'EMPLOYEE', firstName, lastName } = req.body;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { employeeId }] },
  });
  if (existing) {
    if (existing.email === email) throw new AppError('Email already in use', 409, 'EMAIL_TAKEN');
    throw new AppError('Employee ID already in use', 409, 'EMPLOYEE_ID_TAKEN');
  }

  const passwordHash = await hashPassword(password);
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        employeeId,
        email,
        passwordHash,
        role,
        emailVerificationToken: verificationToken,
      },
    });

    await tx.employeeProfile.create({
      data: {
        userId: newUser.id,
        firstName,
        lastName,
      },
    });

    return newUser;
  });

  try {
    const verifyUrl = `${env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(email)}`;
    await sendMail({
      to: email,
      subject: 'Verify your Dayflow account',
      html: `
        <h2>Welcome to Dayflow HRMS!</h2>
        <p>Hi ${firstName}, please verify your email to activate your account.</p>
        <a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#6366f1;color:white;border-radius:8px;text-decoration:none;">Verify Email</a>
      `,
    });
  } catch (err) {
    console.error('[Auth] Email send failed (non-fatal):', err);
  }

  sendSuccess(res, { user: sanitizeUser(user) }, 'Account created. Please verify your email.', 201);
});

// 2. Verify Email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token, email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.emailVerificationToken !== token) {
    throw new AppError('Invalid or expired verification token', 400, 'INVALID_TOKEN');
  }
  if (user.isEmailVerified) {
    throw new AppError('Email already verified', 400, 'ALREADY_VERIFIED');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isEmailVerified: true, emailVerificationToken: null },
  });

  sendSuccess(res, { message: 'Email verified successfully' });
});

// 3. Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
  const hashedRefresh = await hashToken(refreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(
    res,
    {
      accessToken,
      user: {
        id: user.id,
        employeeId: user.employeeId,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        profile: user.profile,
      },
    },
    'Logged in successfully'
  );
});

// 4. Refresh Token
export const refresh = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingToken) {
    throw new AppError('Refresh token is required', 401, 'MISSING_REFRESH_TOKEN');
  }

  let payload;
  try {
    payload = verifyRefreshToken(incomingToken);
  } catch {
    throw new AppError('Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN');
  }

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user || !user.refreshToken || !(await compareToken(incomingToken, user.refreshToken))) {
    throw new AppError('Session expired, please log in again', 401, 'SESSION_EXPIRED');
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const newRefreshToken = generateRefreshToken({ id: user.id, role: user.role });
  const hashedRefresh = await hashToken(newRefreshToken);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefresh },
  });

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, { accessToken }, 'Token refreshed');
});

// 5. Logout
export const logout = asyncHandler(async (req, res) => {
  if (req.user?.id) {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { refreshToken: null },
    });
  }
  res.clearCookie('refreshToken');
  sendSuccess(res, null, 'Logged out successfully');
});
