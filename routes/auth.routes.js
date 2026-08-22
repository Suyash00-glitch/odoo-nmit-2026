import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { signupSchema, loginSchema, verifyEmailSchema } from '../modules/auth/auth.validator.js';
import * as authController from '../modules/auth/auth.controller.js';

const router = Router();

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/verify-email', validate(verifyEmailSchema), authController.verifyEmail);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authMiddleware, authController.logout);

export default router;
