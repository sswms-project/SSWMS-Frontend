import { z } from 'zod'
import { passwordRequirements } from '@/features/auth/schemas/register.schema'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .refine(passwordRequirements[0].validate, passwordRequirements[0].message)
      .refine(passwordRequirements[1].validate, passwordRequirements[1].message)
      .refine(passwordRequirements[2].validate, passwordRequirements[2].message)
      .refine(passwordRequirements[3].validate, passwordRequirements[3].message)
      .refine(passwordRequirements[4].validate, passwordRequirements[4].message),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
