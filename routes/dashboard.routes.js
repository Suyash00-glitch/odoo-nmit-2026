import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import * as dashboardController from '../modules/dashboard/dashboard.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/employee', dashboardController.getEmployeeDashboard);
router.get('/admin', requireRole('ADMIN'), dashboardController.getAdminDashboard);

export default router;
