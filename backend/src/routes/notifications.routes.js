import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import * as notifications from '../controllers/notifications.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', notifications.getNotifications);
router.patch('/read-all', notifications.markAllAsRead);
router.patch('/:id/read', notifications.markAsRead);

export default router;
