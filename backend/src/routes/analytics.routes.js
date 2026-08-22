import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import * as analytics from '../controllers/analytics.controller.js';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/attendance-summary', analytics.getAttendanceSummary);
router.get('/leave-summary', analytics.getLeaveSummary);

export default router;
