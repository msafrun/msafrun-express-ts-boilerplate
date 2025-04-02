import { z } from 'zod';
import { RoleName } from '../../../constants/role.constant';

export const createUserSchema = z.object({
  fullname: z.string().min(6, 'Username must be at least 6 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum([RoleName.USER, RoleName.ADMIN]).default(RoleName.USER),
});

export const detailUserSchema = z.object({
  user_id: z.string({
    message: 'user_id params is required',
  }),
});

export const listUserSchema = z.object({
  offset: z.string().default('0').transform(Number),
  limit: z.string().default('10').transform(Number),
  search: z.string().optional(),
  sort: z.string().default('desc'),
});

export const updateUserSchema = z.object({
  fullname: z
    .string()
    .min(6, 'Username must be at least 6 characters long')
    .optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
  role: z
    .enum([RoleName.USER, RoleName.ADMIN])
    .default(RoleName.USER)
    .optional(),
});

export const deleteUserSchema = z.object({
  soft_delete: z.boolean().optional().default(true),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type DetailUserSchema = z.infer<typeof detailUserSchema>;
export type ListUserSchema = z.infer<typeof listUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
