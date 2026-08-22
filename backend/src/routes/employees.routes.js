import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as employees from '../controllers/employees.controller.js';

const router = Router();

const updateEmployeeSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  dateOfJoining: z.string().datetime().optional(),
  employmentType: z.string().optional(),
  managerId: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
});
const createEmployeeSchema = z.object({
  firstName: z.string().min(1), lastName: z.string().min(1), email: z.string().email(),
  phone: z.string().optional(), address: z.string().optional(), jobTitle: z.string().optional(),
  department: z.string().optional(), dateOfJoining: z.string().optional(), employmentType: z.string().optional(), managerId: z.string().optional(),
});

const employeeQuerySchema = z.object({
  department: z.string().optional(),
  page: z.string().optional().default('1'),
  limit: z.string().optional().default('10'),
  search: z.string().optional(),
});

router.use(authMiddleware, requireRole('ADMIN'));

router.get('/', validate(employeeQuerySchema, 'query'), employees.getEmployees);
router.post('/', validate(createEmployeeSchema), employees.createEmployee);
router.get('/:id', employees.getEmployee);
router.put('/:id', validate(updateEmployeeSchema), employees.updateEmployee);

export default router;
