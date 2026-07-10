import type { Metadata } from 'next'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'

export const metadata: Metadata = {
  title: 'Đăng ký | SSWMS',
  description: 'Đăng ký tenant owner cho Smart SaaS Warehouse Management System',
}

export default function Page() {
  return <RegisterPage />
}
