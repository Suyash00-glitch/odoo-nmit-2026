import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as payroll from '../controllers/payroll.controller.js';

const router = Router();

const updatePayrollSchema = z.object({
  baseSalary: z.number().positive('Base salary must be positive'),
  allowances: z.record(z.string(), z.number()).optional().default({}),
  deductions: z.record(z.string(), z.number()).optional().default({}),
  effectiveDate: z.string().min(1, 'Effective date is required'),
});

router.use(authMiddleware);

router.get('/me', payroll.getMyPayroll);
router.get('/:employeeId', requireRole('ADMIN'), payroll.getEmployeePayroll);
router.put('/:employeeId', requireRole('ADMIN'), validate(updatePayrollSchema), payroll.updateEmployeePayroll);

export default router;
