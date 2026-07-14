import type { Metadata } from 'next'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu | KOVIA',
  description: 'Đặt lại mật khẩu tài khoản KOVIA bằng link xác thực từ email',
}

interface PageProps {
  readonly searchParams: Promise<{
    readonly token?: string | readonly string[]
  }>
}

function normalizeToken(token?: string | readonly string[]) {
  const value = Array.isArray(token) ? token[0] : token
  const normalizedValue = value?.trim()
  return normalizedValue || undefined
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const token = normalizeToken(params.token)
  return <ResetPasswordPage token={token} />
}
