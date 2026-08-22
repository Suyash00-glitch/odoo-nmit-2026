import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateMeSchema } from '../modules/users/users.validator.js';
import * as usersController from '../modules/users/users.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/me', usersController.getMe);
router.put('/me', validate(updateMeSchema), usersController.updateMe);

export default router;
