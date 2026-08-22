import { prisma } from '../config/db.js';
import { AppError, asyncHandler, sendSuccess } from '../utils/helpers.js';

// GET /api/notifications
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const unreadCount = await prisma.notification.count({
    where: { userId: req.user.id, isRead: false },
  });

  sendSuccess(res, { notifications, unreadCount }, 'Notifications retrieved');
});

// PATCH /api/notifications/:id/read
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await prisma.notification.findUnique({
    where: { id: req.params.id },
  });

  if (!notification) throw new AppError('Notification not found', 404, 'NOT_FOUND');
  if (notification.userId !== req.user.id) throw new AppError('Forbidden', 403, 'FORBIDDEN');

  const updated = await prisma.notification.update({
    where: { id: req.params.id },
    data: { isRead: true },
  });

  sendSuccess(res, updated, 'Notification marked as read');
});

// PATCH /api/notifications/read-all
export const markAllAsRead = asyncHandler(async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, isRead: false },
    data: { isRead: true },
  });

  sendSuccess(res, null, 'All notifications marked as read');
});
