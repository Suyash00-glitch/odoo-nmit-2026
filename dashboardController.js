import { prisma } from '../config/db.js';
import { asyncHandler, sendSuccess, subDays } from '../utils/helpers.js';


export const getEmployeeDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const thirtyDaysAgo = subDays(today, 30);

  const [todayAttendance, pendingLeaves, totalLeaves, recentAttendance, unreadNotifications] =
    await prisma.$transaction([
      prisma.attendance.findUnique({
        where: { employeeId_date: { employeeId: userId, date: today } },
      }),
      prisma.leaveRequest.count({
        where: { employeeId: userId, status: 'PENDING' },
      }),
      prisma.leaveRequest.count({
        where: { employeeId: userId },
      }),
      prisma.attendance.findMany({
        where: { employeeId: userId, date: { gte: thirtyDaysAgo } },
        orderBy: { date: 'desc' },
        take: 7,
      }),
      prisma.notification.count({
        where: { userId, isRead: false },
      }),
    ]);

  const presentDays = await prisma.attendance.count({
    where: {
      employeeId: userId,
      date: { gte: thirtyDaysAgo },
      status: { in: ['PRESENT', 'HALF_DAY'] },
    },
  });

  const attendanceRate = recentAttendance.length > 0 ? Math.round((presentDays / 30) * 100) : 0;

  sendSuccess(
    res,
    {
      todayAttendance,
      pendingLeaves,
      totalLeaves,
      recentAttendance,
      attendanceRate,
      unreadNotifications,
      isCheckedIn: !!todayAttendance?.checkIn,
      isCheckedOut: !!todayAttendance?.checkOut,
    },
    'Dashboard data retrieved'
  );
});


export const getAdminDashboard = asyncHandler(async (_req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalEmployees, pendingLeaves, todayCheckIns, recentLeaves] = await prisma.$transaction([
    prisma.user.count({ where: { role: 'EMPLOYEE' } }),
    prisma.leaveRequest.count({ where: { status: 'PENDING' } }),
    prisma.attendance.count({
      where: { date: today, checkIn: { not: null } },
    }),
    prisma.leaveRequest.findMany({
      where: { status: 'PENDING' },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            profile: { select: { firstName: true, lastName: true, department: true } },
          },
        },
      },
    }),
  ]);

  const todayAttendanceRate = totalEmployees > 0 ? Math.round((todayCheckIns / totalEmployees) * 100) : 0;

  const departmentCounts = await prisma.employeeProfile.groupBy({
    by: ['department'],
    _count: { id: true },
    where: { department: { not: null } },
  });

  sendSuccess(
    res,
    {
      totalEmployees,
      pendingLeaves,
      todayAttendanceRate,
      todayCheckIns,
      recentLeaves,
      departmentCounts: departmentCounts.map((d) => ({
        department: d.department,
        count: d._count.id,
      })),
    },
    'Admin dashboard data retrieved'
  );
});