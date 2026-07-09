import { z } from 'zod'

const vietnamPhoneRegex = /^(0|\+84)[3-9][0-9]{8}$/

export const passwordRequirements = [
  {
    id: 'min-length',
    label: 'Ít nhất 8 ký tự',
    message: 'Mật khẩu phải có ít nhất 8 ký tự',
    validate: (value: string) => value.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Có ít nhất một chữ hoa',
    message: 'Mật khẩu phải có ít nhất một chữ hoa',
    validate: (value: string) => /[A-Z]/.test(value),
  },
  {
    id: 'lowercase',
    label: 'Có ít nhất một chữ thường',
    message: 'Mật khẩu phải có ít nhất một chữ thường',
    validate: (value: string) => /[a-z]/.test(value),
  },
  {
    id: 'number',
    label: 'Có ít nhất một chữ số',
    message: 'Mật khẩu phải có ít nhất một chữ số',
    validate: (value: string) => /[0-9]/.test(value),
  },
  {
    id: 'special-character',
    label: 'Có ít nhất một ký tự đặc biệt',
    message: 'Mật khẩu phải có ký tự đặc biệt',
    validate: (value: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
  },
] as const

export const registerSchema = z
  .object({
    tenantName: z
      .string()
      .trim()
      .min(1, 'Tên doanh nghiệp là bắt buộc')
      .max(255, 'Tên doanh nghiệp không được vượt quá 255 ký tự'),
    ownerName: z
      .string()
      .trim()
      .min(1, 'Tên chủ sở hữu là bắt buộc')
      .max(255, 'Tên chủ sở hữu không được vượt quá 255 ký tự'),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value.length === 0 || vietnamPhoneRegex.test(value),
        'Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10 chữ số'
      ),
    email: z.string().trim().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
    address: z
      .string()
      .trim()
      .min(1, 'Địa chỉ là bắt buộc')
      .max(500, 'Địa chỉ không được vượt quá 500 ký tự'),
    password: z
      .string()
      .refine(passwordRequirements[0].validate, passwordRequirements[0].message)
      .refine(passwordRequirements[1].validate, passwordRequirements[1].message)
      .refine(passwordRequirements[2].validate, passwordRequirements[2].message)
      .refine(passwordRequirements[3].validate, passwordRequirements[3].message)
      .refine(passwordRequirements[4].validate, passwordRequirements[4].message),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
    acceptTerms: z.boolean().refine((value) => value, 'Bạn cần đồng ý với điều khoản dịch vụ'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
