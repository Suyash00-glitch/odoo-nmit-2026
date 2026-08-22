import { prisma } from '../config/db.js';
import crypto from 'crypto';
import { sendMail } from '../config/mailer.js';
import { env } from '../config/env.js';
import { AppError, asyncHandler, sendSuccess, hashPassword } from '../utils/helpers.js';

const inviteExpiry = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const tokenHash = (token) => crypto.createHash('sha256').update(token).digest('hex');

const createEmployeeId = async () => {
  let employeeId;
  do employeeId = `EMP-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  while (await prisma.user.findUnique({ where: { employeeId } }));
  return employeeId;
};

// POST /api/employees (Admin): HR creates the source-of-truth employment record
// and the employee receives their immutable ID and secure activation link by email.
export const createEmployee = asyncHandler(async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  if (await prisma.user.findUnique({ where: { email } })) throw new AppError('An employee already uses this email address.', 409, 'EMAIL_TAKEN');
  const employeeId = await createEmployeeId();
  const rawToken = crypto.randomBytes(32).toString('hex');
  const employee = await prisma.user.create({
    data: {
      employeeId,
      email,
      passwordHash: await hashPassword(crypto.randomBytes(32).toString('hex')),
      role: 'EMPLOYEE',
      isEmailVerified: false,
      emailVerificationToken: tokenHash(rawToken),
      emailVerificationExpiresAt: inviteExpiry(),
      profile: { create: {
        firstName: req.body.firstName, lastName: req.body.lastName,
        phone: req.body.phone || null, address: req.body.address || null,
        jobTitle: req.body.jobTitle || null, department: req.body.department || null,
        employmentType: req.body.employmentType || 'Full-time',
        dateOfJoining: req.body.dateOfJoining ? new Date(req.body.dateOfJoining) : null,
        managerId: req.body.managerId || null,
      } },
    },
    select: selectSafeUser,
  });
  const activationUrl = `${env.FRONTEND_URL}/activate-account?token=${rawToken}`;
  await sendMail({
    to: email,
    subject: 'Your Dayflow employee account is ready',
    text: `Welcome to Dayflow. Your employee ID is ${employeeId}. Activate your account within 7 days: ${activationUrl}`,
    html: `<p>Welcome to Dayflow.</p><p>Your employee ID is <strong>${employeeId}</strong>.</p><p><a href="${activationUrl}">Activate your account</a> within 7 days to create your password and verify your work email.</p>`,
  });
  sendSuccess(res, employee, `Employee created. An activation email was sent to ${email}.`, 201);
});

const selectSafeUser = {
  id: true,
  employeeId: true,
  email: true,
  role: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true,
  profile: {
    include: {
      documents: true,
    },
  },
  payroll: true,
};

// GET /api/employees (Admin)
export const getEmployees = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const where = { role: 'EMPLOYEE' };
  if (req.query.department) {
    where.profile = { department: req.query.department };
  }
  if (req.query.search) {
    where.OR = [
      { email: { contains: req.query.search, mode: 'insensitive' } },
      { employeeId: { contains: req.query.search, mode: 'insensitive' } },
      { profile: { firstName: { contains: req.query.search, mode: 'insensitive' } } },
      { profile: { lastName: { contains: req.query.search, mode: 'insensitive' } } },
    ];
  }

  const [employees, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: selectSafeUser,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  sendSuccess(
    res,
    {
      employees,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    },
    'Employees retrieved'
  );
});

// GET /api/employees/:id (Admin)
export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: selectSafeUser,
  });
  if (!employee) throw new AppError('Employee not found', 404, 'NOT_FOUND');
  sendSuccess(res, employee, 'Employee retrieved');
});

// PUT /api/employees/:id (Admin)
export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: { profile: true },
  });
  if (!employee) throw new AppError('Employee not found', 404, 'NOT_FOUND');

  const { firstName, lastName, ...profileFields } = req.body;

  await prisma.employeeProfile.update({
    where: { userId: req.params.id },
    data: {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...profileFields,
      ...(profileFields.dateOfJoining && {
        dateOfJoining: new Date(profileFields.dateOfJoining),
      }),
    },
  });

  const updated = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: selectSafeUser,
  });

  sendSuccess(res, updated, 'Employee updated successfully');
});
