import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email format.').min(1, 'Email is required.').max(255),
  password: z.string().min(4, 'Password must be at least 4 characters.').max(255),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, 'Name is required.').max(255),
  lastName: z.string().min(1, 'Name is required.').max(255),
  email: z.string().email('Invalid email format.').min(1, 'Email is required.').max(255),
  password: z.string().min(4, 'Password must be at least 4 characters.').max(255),
});
