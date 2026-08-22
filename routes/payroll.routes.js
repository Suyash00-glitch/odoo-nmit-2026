import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updatePayrollSchema } from '../modules/payroll/payroll.validator.js';
import * as payrollController from '../modules/payroll/payroll.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/me', payrollController.getMyPayroll);
router.get('/:employeeId', requireRole('ADMIN'), payrollController.getEmployeePayroll);
router.put('/:employeeId', requireRole('ADMIN'), validate(updatePayrollSchema), payrollController.updateEmployeePayroll);

export default router;
