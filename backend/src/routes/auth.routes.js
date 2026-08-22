import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middlewares/validate.js';
import { authMiddleware } from '../middlewares/auth.js';
import * as auth from '../controllers/auth.controller.js';

const router = Router();

const signupSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const verificationSchema = z.object({ token: z.string().min(1, 'Verification token is required') });
const activationSchema = z.object({ token: z.string().min(1), password: z.string().min(6, 'Password must be at least 6 characters') });
const resendVerificationSchema = z.object({ email: z.string().email('Invalid email address') });

router.post('/signup', validate(signupSchema), auth.signup);
router.post('/verify-email', validate(verificationSchema), auth.verifyEmail);
router.post('/activate', validate(activationSchema), auth.activateAccount);
router.post('/resend-verification', validate(resendVerificationSchema), auth.resendVerificationEmail);
router.post('/login', validate(loginSchema), auth.login);
router.post('/refresh', auth.refresh);
router.post('/logout', authMiddleware, auth.logout);

export default router;
