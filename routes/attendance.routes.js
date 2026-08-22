import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { attendanceQuerySchema } from '../modules/attendance/attendance.validator.js';
import * as attendanceController from '../modules/attendance/attendance.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/check-in', attendanceController.checkIn);
router.post('/check-out', attendanceController.checkOut);
router.get('/me', validate(attendanceQuerySchema, 'query'), attendanceController.getMyAttendance);
router.get('/:employeeId', requireRole('ADMIN'), validate(attendanceQuerySchema, 'query'), attendanceController.getEmployeeAttendance);

export default router;
