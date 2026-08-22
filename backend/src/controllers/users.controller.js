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
  profile: {
    include: {
      documents: true,
    },
  },
  payroll: true,
};

// GET /api/users/me
export const getMe = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: selectSafeUser,
  });
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
  sendSuccess(res, user, 'Profile retrieved');
});

// PUT /api/users/me
export const updateMe = asyncHandler(async (req, res) => {
  const { phone, address, profilePictureUrl } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { profile: true },
  });
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

  await prisma.employeeProfile.update({
    where: { userId: req.user.id },
    data: { phone, address, profilePictureUrl },
  });

  const updatedUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: selectSafeUser,
  });

  sendSuccess(res, updatedUser, 'Profile updated successfully');
});
