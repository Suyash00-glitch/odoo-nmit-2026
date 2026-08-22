import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import * as analyticsController from '../modules/analytics/analytics.controller.js';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/attendance-summary', analyticsController.getAttendanceSummary);
router.get('/leave-summary', analyticsController.getLeaveSummary);

export default router;
