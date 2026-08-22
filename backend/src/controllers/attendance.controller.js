import { prisma } from '../config/db.js';
import { AppError, asyncHandler, sendSuccess, startOfWeek, endOfWeek, subDays } from '../utils/helpers.js';

// POST /api/attendance/check-in
export const checkIn = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.attendance.findUnique({
    where: { employeeId_date: { employeeId: req.user.id, date: today } },
  });

  if (existing && existing.checkIn) {
    throw new AppError('Already checked in today', 400, 'ALREADY_CHECKED_IN');
  }

  const now = new Date();
  const record = existing
    ? await prisma.attendance.update({
        where: { id: existing.id },
        data: { checkIn: now, status: 'PRESENT' },
      })
    : await prisma.attendance.create({
        data: {
          employeeId: req.user.id,
          date: today,
          checkIn: now,
          status: 'PRESENT',
        },
      });

  sendSuccess(res, record, 'Checked in successfully', 201);
});

// POST /api/attendance/check-out
export const checkOut = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.attendance.findUnique({
    where: { employeeId_date: { employeeId: req.user.id, date: today } },
  });

  if (!existing || !existing.checkIn) {
    throw new AppError('You have not checked in today', 400, 'NOT_CHECKED_IN');
  }
  if (existing.checkOut) {
    throw new AppError('Already checked out today', 400, 'ALREADY_CHECKED_OUT');
  }

  const record = await prisma.attendance.update({
    where: { id: existing.id },
    data: { checkOut: new Date() },
  });

  sendSuccess(res, record, 'Checked out successfully');
});

// GET /api/attendance/me
export const getMyAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate;
  let endDate;

  if (req.query.view === 'weekly') {
    startDate = startOfWeek(today);
    endDate = endOfWeek(today);
  } else {
    startDate = today;
    endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);
  }

  if (req.query.startDate) startDate = new Date(req.query.startDate);
  if (req.query.endDate) endDate = new Date(req.query.endDate);

  const records = await prisma.attendance.findMany({
    where: {
      employeeId: req.user.id,
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { date: 'desc' },
  });

  const todayRecord = await prisma.attendance.findUnique({
    where: { employeeId_date: { employeeId: req.user.id, date: today } },
  });

  sendSuccess(res, { records, todayRecord, view: req.query.view || 'daily' }, 'Attendance retrieved');
});

// GET /api/attendance/:employeeId (Admin)
export const getEmployeeAttendance = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysAgo = subDays(today, 30);

  const startDate = req.query.startDate ? new Date(req.query.startDate) : thirtyDaysAgo;
  const endDate = req.query.endDate ? new Date(req.query.endDate) : today;

  const records = await prisma.attendance.findMany({
    where: {
      employeeId: req.params.employeeId,
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { date: 'desc' },
  });

  sendSuccess(res, records, 'Attendance retrieved');
});
