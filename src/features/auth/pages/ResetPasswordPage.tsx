'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/routes/app-routes'
import type { ApiErrorResponse } from '@/types/api'
import { ResetPasswordForm } from '../components/ResetPasswordPage'
import { useResetPassword } from '../hooks/use-auth'
import type { ResetPasswordFormValues } from '../schemas/reset-password.schema'

interface ResetPasswordPageProps {
  readonly token?: string
}

function getResetPasswordErrorMessage(error: unknown) {
  const apiError = error as Partial<ApiErrorResponse>
  return apiError.message ?? 'Link đặt lại mật khẩu đã hết hạn hoặc không hợp lệ.'
}

export function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const router = useRouter()
  const resetPasswordMutation = useResetPassword()
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (!isSuccess) return
    const timer = setTimeout(() => router.replace(APP_ROUTES.auth.login), 1600)
    return () => clearTimeout(timer)
  }, [isSuccess, router])

  async function handleResetPassword(values: ResetPasswordFormValues) {
    if (!token) return

    try {
      setErrorMessage(undefined)
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: values.password,
      })
      setIsSuccess(true)
    } catch (error) {
      setErrorMessage(getResetPasswordErrorMessage(error))
    }
  }

  return (
    <ResetPasswordForm
      token={token}
      onSubmit={handleResetPassword}
      isLoading={resetPasswordMutation.isPending}
      isSuccess={isSuccess}
      errorMessage={errorMessage}
    />
  )
}
