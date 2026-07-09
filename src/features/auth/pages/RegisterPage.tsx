'use client'

import * as React from 'react'
import { Warehouse } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRegisterMutation } from '../hooks/use-auth'
import type { RegisterFormValues } from '../schemas/register.schema'
import { BenefitsPanel, RegisterForm, RegisterSuccess } from '../components/RegisterPage'

export function RegisterPage() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)
  const registerMutation = useRegisterMutation()

  async function handleRegister(values: RegisterFormValues) {
    try {
      const response = await registerMutation.mutateAsync({
        tenantName: values.tenantName.trim(),
        ownerName: values.ownerName.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        address: values.address.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
        acceptTerms: values.acceptTerms,
      })
      setSuccessMessage(response.data)
      toast.success('Đăng ký thành công. Vui lòng kiểm tra email xác minh.')
    } catch {
      // onError in useRegisterMutation handles logging + toast
    }
  }

  return (
    <main className="bg-background text-foreground min-h-[100dvh]">
      <header className="border-border bg-background/90 sticky top-0 z-40 border-b px-4 backdrop-blur-md md:px-6">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between">
          <Link href="/" className="text-primary flex items-center gap-2" aria-label="SSWMS">
            <Warehouse className="size-7" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight">SSWMS</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs font-semibold md:inline">
              Hỗ trợ trực tuyến: 1800-SSWMS
            </span>
            <Link
              href="/login"
              className="text-primary text-xs font-semibold underline-offset-4 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-start gap-5 px-4 py-5 md:min-h-[calc(100dvh-4.25rem)] md:grid-cols-12 md:items-center md:px-6 md:py-4">
        <aside
          className="hidden md:col-span-5 md:flex md:flex-col md:gap-3"
          aria-label="SSWMS benefits"
        >
          <BenefitsPanel />
        </aside>

        <section className="md:col-span-7">
          {successMessage ? (
            <RegisterSuccess
              message={successMessage}
              onCreateAnother={() => setSuccessMessage(null)}
            />
          ) : (
            <RegisterForm onSubmit={handleRegister} isLoading={registerMutation.isPending} />
          )}
        </section>
      </section>
    </main>
  )
}
