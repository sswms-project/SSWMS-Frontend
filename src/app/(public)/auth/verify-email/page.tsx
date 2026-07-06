import { VerifyEmailResult } from '@/features/auth/components/verify-email-result'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Xác minh email | SSWMS',
  description: 'Xác minh email đăng ký tenant owner cho Smart SaaS Warehouse Management System',
}

interface VerifyEmailPageProps {
  readonly searchParams: Promise<{
    readonly token?: string | readonly string[]
  }>
}

function normalizeToken(token?: string | readonly string[]) {
  const value = Array.isArray(token) ? token[0] : token
  const normalizedValue = value?.trim()

  return normalizedValue || undefined
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams
  const token = normalizeToken(params.token)

  return <VerifyEmailResult token={token} />
}
