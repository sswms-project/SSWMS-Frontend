'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
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
      <motion.div
        className="bg-card flex flex-1 flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <header className="flex items-center justify-between px-8 py-5 lg:px-12">
          <Link
            href="/"
            className="text-foreground flex items-center gap-2 lg:hidden"
            aria-label="SSWMS"
          >
            <Warehouse className="size-5" aria-hidden="true" />
            <span className="text-base font-bold tracking-tight">SSWMS</span>
          </Link>
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs md:inline">
              Hỗ trợ: 1800-SSWMS
            </span>
            <Link
              href={APP_ROUTES.auth.login}
              className="text-foreground border-border hover:bg-muted rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
            >
              Đăng nhập
            </Link>
          </div>
        </header>

        <div className="flex-1 px-8 py-8 lg:px-12 xl:px-16">
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
      </motion.div>
    </div>
  )
}
