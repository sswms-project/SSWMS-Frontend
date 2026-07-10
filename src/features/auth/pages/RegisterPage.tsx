'use client'

import * as React from 'react'
import { Warehouse } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
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
    <div className="flex min-h-dvh">
      {/* Left brand panel — sticky, full viewport height */}
      <aside className="sticky top-0 hidden h-dvh flex-shrink-0 lg:block lg:w-[42%] xl:w-[45%]">
        <BenefitsPanel />
      </aside>

      {/* Right scrollable form area */}
      <div className="flex flex-1 flex-col bg-white">
        <header className="flex items-center justify-between px-8 py-5 lg:px-12">
          {/* Mobile-only logo */}
          <Link
            href="/"
            className="text-primary flex items-center gap-2 lg:hidden"
            aria-label="SSWMS"
          >
            <Warehouse className="size-6" aria-hidden="true" />
            <span className="text-lg font-bold tracking-tight">SSWMS</span>
          </Link>
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs md:inline">
              Hỗ trợ: 1800-SSWMS
            </span>
            <Link
              href={APP_ROUTES.auth.login}
              className="text-primary text-sm font-semibold underline-offset-4 hover:underline"
            >
              Đăng nhập
            </Link>
          </div>
        </header>

        <div className="flex-1 px-8 py-6 lg:px-12 xl:px-16">
          <div className="max-w-xl">
            {successMessage ? (
              <RegisterSuccess
                message={successMessage}
                onCreateAnother={() => setSuccessMessage(null)}
              />
            ) : (
              <RegisterForm onSubmit={handleRegister} isLoading={registerMutation.isPending} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
