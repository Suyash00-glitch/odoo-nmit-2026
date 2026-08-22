import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import * as notificationsController from '../modules/notifications/notifications.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', notificationsController.getNotifications);
router.patch('/read-all', notificationsController.markAllAsRead);
router.patch('/:id/read', notificationsController.markAsRead);

export default router;
