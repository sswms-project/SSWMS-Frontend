import { z } from 'zod'

export const loginSchema = z.object({
  tenantCode: z.string().min(2, 'Tenant code is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
