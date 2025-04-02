import { Router } from 'express';
import validate from '../../../middlewares/validate-dto.middleware';
import {
  createUserSchema,
  deleteUserSchema,
  detailUserSchema,
  listUserSchema,
  updateUserSchema,
} from './user.dto';
import {
  authenticate,
  rbacMiddleware,
} from '../../../middlewares/auth.middleware';
import { userController } from '.';
import { RoleName } from '../../../constants/role.constant';

const router = Router();

router.use(authenticate);

// POST
router.post(
  '/',
  rbacMiddleware([RoleName.ADMIN]),
  validate(createUserSchema),
  userController.createUser,
);

// GET
router.get(
  '/',
  rbacMiddleware([RoleName.ADMIN]),
  validate(listUserSchema, 'query'),
  userController.getListUser,
);

router.get(
  '/:user_id',
  rbacMiddleware([RoleName.ADMIN]),
  validate(detailUserSchema, 'params'),
  userController.getDetailUser,
);

// PATCH & PUT
router.patch(
  '/:user_id',
  rbacMiddleware([RoleName.ADMIN]),
  validate(updateUserSchema, 'params'),
  userController.updateUser,
);

// DELETE
router.patch(
  '/:user_id',
  rbacMiddleware([RoleName.ADMIN]),
  validate(deleteUserSchema),
  userController.deleteUser,
);

export default router;
