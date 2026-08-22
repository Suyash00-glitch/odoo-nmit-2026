import { prisma } from '../config/db.js';
import { sendMail } from '../config/mailer.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/helpers.js';

// POST /api/leaves
export const applyLeave = asyncHandler(async (req, res) => {
  const { leaveType, startDate, endDate, remarks } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    throw new AppError('End date must be after start date', 400, 'INVALID_DATE_RANGE');
  }

  const overlapping = await prisma.leaveRequest.findFirst({
    where: {
      employeeId: req.user.id,
      status: { in: ['PENDING', 'APPROVED'] },
      OR: [{ startDate: { lte: end }, endDate: { gte: start } }],
    },
  });

  if (overlapping) {
    throw new AppError(
      'You already have a pending or approved leave overlapping this period',
      409,
      'OVERLAPPING_LEAVE'
    );
  }

  const leave = await prisma.leaveRequest.create({
    data: {
      employeeId: req.user.id,
      leaveType,
      startDate: start,
      endDate: end,
      remarks,
    },
    include: { employee: { include: { profile: true } } },
  });

  sendSuccess(res, leave, 'Leave request submitted successfully', 201);
});

// GET /api/leaves/me
export const getMyLeaves = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const where = { employeeId: req.user.id };
  if (req.query.status) where.status = req.query.status;

  const [leaves, total] = await prisma.$transaction([
    prisma.leaveRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { reviewedBy: { select: { profile: true } } },
    }),
    prisma.leaveRequest.count({ where }),
  ]);

  sendSuccess(res, { leaves, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } }, 'Leave requests retrieved');
});

// GET /api/leaves (Admin)
export const getAllLeaves = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const where = {};
  if (req.query.status) where.status = req.query.status;

  const [leaves, total] = await prisma.$transaction([
    prisma.leaveRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        employee: {
          select: {
            id: true,
            employeeId: true,
            email: true,
            profile: { select: { firstName: true, lastName: true, department: true, jobTitle: true } },
          },
        },
        reviewedBy: { select: { profile: { select: { firstName: true, lastName: true } } } },
      },
    }),
    prisma.leaveRequest.count({ where }),
  ]);

  sendSuccess(res, { leaves, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } }, 'All leave requests retrieved');
});

// PATCH /api/leaves/:id/decision (Admin)
export const makeLeaveDecision = asyncHandler(async (req, res) => {
  const { status, reviewComments } = req.body;
  const leaveId = req.params.id;

  const leave = await prisma.leaveRequest.findUnique({
    where: { id: leaveId },
    include: { employee: { include: { profile: true } } },
  });

  if (!leave) throw new AppError('Leave request not found', 404, 'NOT_FOUND');
  if (leave.status !== 'PENDING') {
    throw new AppError('Leave request has already been decided', 400, 'ALREADY_DECIDED');
  }

  const updatedLeave = await prisma.$transaction(async (tx) => {
    const updated = await tx.leaveRequest.update({
      where: { id: leaveId },
      data: {
        status,
        reviewedById: req.user.id,
        reviewComments,
      },
      include: {
        employee: { include: { profile: true } },
        reviewedBy: { select: { profile: true } },
      },
    });

    const statusText = status === 'APPROVED' ? 'approved' : 'rejected';
    await tx.notification.create({
      data: {
        userId: leave.employeeId,
        title: `Leave Request ${status === 'APPROVED' ? 'Approved' : 'Rejected'}`,
        message: `Your ${leave.leaveType.toLowerCase()} leave from ${leave.startDate.toDateString()} to ${leave.endDate.toDateString()} has been ${statusText}.${reviewComments ? ` Comment: ${reviewComments}` : ''}`,
      },
    });

    return updated;
  });

  try {
    const statusText = status === 'APPROVED' ? 'approved' : 'rejected';
    const firstName = leave.employee.profile?.firstName ?? 'Employee';
    await sendMail({
      to: leave.employee.email,
      subject: `Your leave request has been ${statusText}`,
      html: `
        <h2>Leave Request ${status === 'APPROVED' ? 'Approved ✅' : 'Rejected ❌'}</h2>
        <p>Hi ${firstName}, your ${leave.leaveType.toLowerCase()} leave has been <strong>${statusText}</strong>.</p>
        ${reviewComments ? `<p><strong>Comment:</strong> ${reviewComments}</p>` : ''}
      `,
    });
  } catch (err) {
    console.error('[Leaves] Email send failed (non-fatal):', err);
  }

  sendSuccess(res, updatedLeave, `Leave request ${status === 'APPROVED' ? 'approved' : 'rejected'}`);
});
