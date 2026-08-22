import { prisma } from '../config/db.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/helpers.js';

const selectSafeUser = {
  id: true,
  employeeId: true,
  email: true,
  role: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true,
  profile: true,
  payroll: true,
};


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


export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: selectSafeUser,
  });
  if (!employee) throw new AppError('Employee not found', 404, 'NOT_FOUND');
  sendSuccess(res, employee, 'Employee retrieved');
});


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
//new updation way
  const updated = await prisma.user.findUnique({
    where: { id: req.params.id },
    select: selectSafeUser,
  });

  sendSuccess(res, updated, 'Employee updated successfully');
});
