import type { Metadata } from 'next'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'

export const metadata: Metadata = {
  title: 'Quên mật khẩu | KOVIA',
  description: 'Yêu cầu email hướng dẫn đặt lại mật khẩu cho tài khoản KOVIA',
}

export default function Page() {
  return <ForgotPasswordPage />
}
