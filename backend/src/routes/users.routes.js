import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import * as users from '../controllers/users.controller.js';

const router = Router();

const updateMeSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
});

router.use(authMiddleware);

router.get('/me', users.getMe);
router.put('/me', validate(updateMeSchema), users.updateMe);

export default router;
