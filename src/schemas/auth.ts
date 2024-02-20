import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().email('Invalid email format.').min(1, 'Email is required.').max(255),
  password: z.string().min(4, 'Password must be at least 4 characters.').max(255),
});
