import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { applyLeaveSchema, leaveDecisionSchema, leaveQuerySchema } from '../modules/leaves/leaves.validator.js';
import * as leavesController from '../modules/leaves/leaves.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', validate(applyLeaveSchema), leavesController.applyLeave);
router.get('/me', validate(leaveQuerySchema, 'query'), leavesController.getMyLeaves);
router.get('/', requireRole('ADMIN'), validate(leaveQuerySchema, 'query'), leavesController.getAllLeaves);
router.patch('/:id/decision', requireRole('ADMIN'), validate(leaveDecisionSchema), leavesController.makeLeaveDecision);

export default router;
