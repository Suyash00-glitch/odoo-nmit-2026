import { Router } from 'express';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import * as dashboard from '../controllers/dashboard.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/employee', dashboard.getEmployeeDashboard);
router.get('/admin', requireRole('ADMIN'), dashboard.getAdminDashboard);

export default router;
