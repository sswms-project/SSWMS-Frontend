import { RegisterForm } from '@/features/auth/components/register-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký | SSWMS',
  description: 'Đăng ký tenant owner cho Smart SaaS Warehouse Management System',
}

export default function RegisterPage() {
  return <RegisterForm />
}
