import { z } from 'zod';
import { RoleName } from '../../../constants/role.constant';

export const registerSchema = z.object({
  fullname: z.string().min(6, 'Username must be at least 6 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum([RoleName.USER, RoleName.ADMIN]).default(RoleName.USER),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const refrehTokenSchema = z.object({
  refresh_token: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RefreshTokenSchema = z.infer<typeof refrehTokenSchema>;
