import { prisma } from '../config/db.js';
import { asyncHandler, sendSuccess, subDays, formatDate } from '../utils/helpers.js';

// GET /api/analytics/attendance-summary (Admin)
export const getAttendanceSummary = asyncHandler(async (_req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysAgo = subDays(today, 30);

  const totalEmployees = await prisma.user.count({ where: { role: 'EMPLOYEE' } });

  const attendanceRecords = await prisma.attendance.groupBy({
    by: ['date', 'status'],
    _count: { id: true },
    where: { date: { gte: thirtyDaysAgo } },
    orderBy: { date: 'asc' },
  });

  const byDate = {};
  for (const record of attendanceRecords) {
    const dateKey = formatDate(record.date);
    if (!byDate[dateKey]) byDate[dateKey] = {};
    byDate[dateKey][record.status] = record._count.id;
  }

  const chartData = Object.entries(byDate).map(([date, statuses]) => {
    const present = statuses.PRESENT ?? 0;
    const absent = statuses.ABSENT ?? 0;
    const halfDay = statuses.HALF_DAY ?? 0;
    const leave = statuses.LEAVE ?? 0;
    const rate = totalEmployees > 0 ? Math.round(((present + halfDay) / totalEmployees) * 100) : 0;
    return { date, present, absent, halfDay, leave, rate };
  });

  const completedCheckIns = await prisma.attendance.findMany({
    where: { date: { gte: thirtyDaysAgo }, checkIn: { not: null } },
    select: { checkIn: true },
  });
  const onTimeCheckIns = completedCheckIns.filter(({ checkIn }) => checkIn.getHours() < 9 || (checkIn.getHours() === 9 && checkIn.getMinutes() === 0)).length;
  const averageRate = chartData.length ? Math.round(chartData.reduce((sum, day) => sum + day.rate, 0) / chartData.length) : 0;
  const pendingLeaves = await prisma.leaveRequest.count({ where: { status: 'PENDING' } });

  sendSuccess(res, {
    chartData, totalEmployees,
    metrics: {
      averageRate,
      onTimeRate: completedCheckIns.length ? Math.round((onTimeCheckIns / completedCheckIns.length) * 100) : 0,
      recordedCheckIns: completedCheckIns.length,
      pendingLeaves,
    },
  }, 'Attendance summary retrieved');
});

// GET /api/analytics/leave-summary (Admin)
export const getLeaveSummary = asyncHandler(async (_req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ninetyDaysAgo = subDays(today, 90);

  const byType = await prisma.leaveRequest.groupBy({
    by: ['leaveType', 'status'],
    _count: { id: true },
    where: { createdAt: { gte: ninetyDaysAgo } },
  });

  const allLeaves = await prisma.leaveRequest.findMany({
    where: { createdAt: { gte: ninetyDaysAgo } },
    select: { leaveType: true, status: true, createdAt: true },
  });

  const byMonth = {};
  for (const leave of allLeaves) {
    const month = leave.createdAt.toISOString().substring(0, 7);
    if (!byMonth[month]) byMonth[month] = { PAID: 0, SICK: 0, UNPAID: 0 };
    byMonth[month][leave.leaveType] = (byMonth[month][leave.leaveType] ?? 0) + 1;
  }

  const monthlyData = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, types]) => ({ month, ...types }));

  const typeBreakdown = [
    { type: 'PAID', count: byType.filter((b) => b.leaveType === 'PAID').reduce((s, b) => s + b._count.id, 0) },
    { type: 'SICK', count: byType.filter((b) => b.leaveType === 'SICK').reduce((s, b) => s + b._count.id, 0) },
    { type: 'UNPAID', count: byType.filter((b) => b.leaveType === 'UNPAID').reduce((s, b) => s + b._count.id, 0) },
  ];

  const statusBreakdown = [
    { status: 'PENDING', count: byType.filter((b) => b.status === 'PENDING').reduce((s, b) => s + b._count.id, 0) },
    { status: 'APPROVED', count: byType.filter((b) => b.status === 'APPROVED').reduce((s, b) => s + b._count.id, 0) },
    { status: 'REJECTED', count: byType.filter((b) => b.status === 'REJECTED').reduce((s, b) => s + b._count.id, 0) },
  ];

  sendSuccess(res, { monthlyData, typeBreakdown, statusBreakdown }, 'Leave summary retrieved');
});
