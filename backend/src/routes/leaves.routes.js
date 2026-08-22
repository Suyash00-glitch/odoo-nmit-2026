import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as leaves from '../controllers/leaves.controller.js';

const router = Router();

const applyLeaveSchema = z.object({
  leaveType: z.enum(['PAID', 'SICK', 'UNPAID']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  remarks: z.string().max(500).optional(),
});

const decisionSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reviewComments: z.string().max(500).optional(),
});

const querySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
});

router.use(authMiddleware);

router.post('/', validate(applyLeaveSchema), leaves.applyLeave);
router.get('/me', validate(querySchema, 'query'), leaves.getMyLeaves);
router.get('/', requireRole('ADMIN'), validate(querySchema, 'query'), leaves.getAllLeaves);
router.patch('/:id/decision', requireRole('ADMIN'), validate(decisionSchema), leaves.makeLeaveDecision);

export default router;
