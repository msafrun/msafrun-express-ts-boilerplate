import { Router } from 'express';
import { loginSchema, refrehTokenSchema, registerSchema } from './auth.dto';
import { authController } from '.';
import validate from '../../../middlewares/validate-dto.middleware';

const router = Router();

// POST
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post(
  '/refresh-token',
  validate(refrehTokenSchema),
  authController.refreshToken,
);

// GET

// PATCH & PUT

// DELETE

export default router;
