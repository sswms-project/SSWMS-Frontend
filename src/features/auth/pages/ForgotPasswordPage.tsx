'use client'

import { useState } from 'react'
import { ForgotPasswordForm } from '../components/ForgotPasswordPage'
import { useForgotPassword } from '../hooks/use-auth'
import type { ForgotPasswordFormValues } from '../schemas/forgot-password.schema'

export function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword()
  const [submittedEmail, setSubmittedEmail] = useState<string>()

  async function handleForgotPassword(values: ForgotPasswordFormValues) {
    try {
      await forgotPasswordMutation.mutateAsync({ email: values.email })
      setSubmittedEmail(values.email)
    } catch {
      // onError in useForgotPassword handles logging + toast
    }
  }

  return (
    <ForgotPasswordForm
      onSubmit={handleForgotPassword}
      isLoading={forgotPasswordMutation.isPending}
      submittedEmail={submittedEmail}
      onReset={() => setSubmittedEmail(undefined)}
    />
  )
}
