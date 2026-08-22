import crypto from 'crypto';
import { prisma } from '../config/db.js';
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
import { sendMail } from '../config/mailer.js';
import { env } from '../config/env.js';

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000;
const digestVerificationToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const sendVerificationEmail = async (user) => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + VERIFICATION_TTL_MS);
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerificationToken: digestVerificationToken(token), emailVerificationExpiresAt: expiresAt },
  });

  const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;
  await sendMail({
    to: user.email,
    subject: 'Verify your Dayflow account',
    text: `Welcome to Dayflow. Verify your email within 24 hours: ${verificationUrl}`,
    html: `<p>Welcome to <strong>Dayflow</strong>.</p><p>Verify your email to activate your workforce account:</p><p><a href="${verificationUrl}">Verify email address</a></p><p>This link expires in 24 hours.</p>`,
  });
};

// Helper to strip sensitive fields
const sanitizeUser = (user) => {
  const { passwordHash, refreshToken, emailVerificationToken, emailVerificationExpiresAt, ...safe } = user;
  return safe;
};

// 1. Sign Up
export const signup = asyncHandler(async (req, res) => {
  let { employeeId, email, password, firstName, lastName, name } = req.body;

  if (!email || !password) {
    throw new AppError('Email and password are required', 400, 'MISSING_FIELDS');
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Parse name if firstName / lastName not provided
  if (!firstName && name) {
    const parts = name.trim().split(/\s+/);
    firstName = parts[0] || 'User';
    lastName = parts.slice(1).join(' ') || '';
  }
  firstName = (firstName || 'User').trim();
  lastName = (lastName || '').trim();

  // Check if email is already in use
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (existingUser) {
    throw new AppError('Email already in use', 409, 'EMAIL_TAKEN');
  }

  // Generate unique employee ID if not provided or ensure uniqueness
  if (!employeeId || !employeeId.trim()) {
    let unique = false;
    while (!unique) {
      const code = crypto.randomBytes(3).toString('hex').toUpperCase();
      const candidateId = `EMP-${new Date().getFullYear()}-${code}`;
      const exists = await prisma.user.findUnique({ where: { employeeId: candidateId } });
      if (!exists) {
        employeeId = candidateId;
        unique = true;
      }
    }
  } else {
    employeeId = employeeId.trim();
    const existingEmpId = await prisma.user.findUnique({
      where: { employeeId },
    });
    if (existingEmpId) {
      const code = crypto.randomBytes(2).toString('hex').toUpperCase();
      employeeId = `${employeeId}-${code}`;
    }
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        employeeId,
        email: normalizedEmail,
        passwordHash,
        // Public registration never grants administrative access.
        role: 'EMPLOYEE',
        isEmailVerified: false,
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

  await sendVerificationEmail(user);
  sendSuccess(res, { user: sanitizeUser(user) }, 'Account created. Check your inbox to verify your email address.', 201);
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const tokenHash = digestVerificationToken(req.body.token);
  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: tokenHash, emailVerificationExpiresAt: { gt: new Date() } },
  });
  if (!user) throw new AppError('This verification link is invalid or has expired. Request a new one.', 400, 'INVALID_VERIFICATION_TOKEN');

  await prisma.user.update({
    where: { id: user.id },
    data: { isEmailVerified: true, emailVerificationToken: null, emailVerificationExpiresAt: null },
  });
  sendSuccess(res, null, 'Email verified. You can now sign in.');
});

// Completes an HR-issued invitation. The token is the only credential that can
// set the initial password, so employee records cannot be claimed by others.
export const activateAccount = asyncHandler(async (req, res) => {
  const tokenHash = digestVerificationToken(req.body.token);
  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: tokenHash, emailVerificationExpiresAt: { gt: new Date() }, isEmailVerified: false },
  });
  if (!user) throw new AppError('This activation link is invalid or has expired. Ask HR to resend your invitation.', 400, 'INVALID_ACTIVATION_TOKEN');
  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await hashPassword(req.body.password),
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpiresAt: null,
    },
  });
  sendSuccess(res, { employeeId: user.employeeId }, 'Account activated. You can now sign in.');
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && !user.isEmailVerified) await sendVerificationEmail(user);
  sendSuccess(res, null, 'If an unverified account exists for this address, a new verification email has been sent.');
});

// 2. Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email ? email.trim().toLowerCase() : '';

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
    include: { profile: true },
  });

  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
  }
  if (!user.isEmailVerified) {
    throw new AppError('Verify your email address before signing in.', 403, 'EMAIL_NOT_VERIFIED');
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

// 3. Refresh Token
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

// 4. Logout
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
