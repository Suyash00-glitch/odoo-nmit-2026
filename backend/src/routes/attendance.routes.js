import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as attendance from '../controllers/attendance.controller.js';

const router = Router();

const querySchema = z.object({
  view: z.enum(['daily', 'weekly']).optional().default('daily'),
  date: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

router.use(authMiddleware);

router.post('/check-in', attendance.checkIn);
router.post('/check-out', attendance.checkOut);
router.get('/me', validate(querySchema, 'query'), attendance.getMyAttendance);
router.get('/:employeeId', requireRole('ADMIN'), validate(querySchema, 'query'), attendance.getEmployeeAttendance);

export default router;
