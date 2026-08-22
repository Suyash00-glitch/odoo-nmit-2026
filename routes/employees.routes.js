import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateEmployeeSchema, employeeQuerySchema } from '../modules/employees/employees.validator.js';
import * as employeesController from '../modules/employees/employees.controller.js';

const router = Router();

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', validate(employeeQuerySchema, 'query'), employeesController.getEmployees);
router.get('/:id', employeesController.getEmployee);
router.put('/:id', validate(updateEmployeeSchema), employeesController.updateEmployee);

export default router;
