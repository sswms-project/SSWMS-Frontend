'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn, Warehouse } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'
import { APP_ROUTES } from '@/routes/app-routes'
import { BenefitsPanel } from '@/features/auth/components/RegisterPage'

interface LoginFormProps {
  readonly onSubmit: (values: LoginFormValues) => Promise<void>
  readonly isLoading: boolean
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <div className="flex min-h-dvh">
      {/* Left brand panel — sticky */}
      <aside className="sticky top-0 hidden h-dvh flex-shrink-0 lg:block lg:w-[42%] xl:w-[45%]">
        <BenefitsPanel />
      </aside>

      {/* Right form area */}
      <div className="bg-card flex flex-1 flex-col">
        <header className="flex items-center justify-between px-8 py-5 lg:px-12">
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
              href={APP_ROUTES.auth.register}
              className="text-primary text-sm font-semibold underline-offset-4 hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </header>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-sm">
            <header className="mb-8">
              <h1 className="text-foreground text-2xl leading-tight font-bold">Đăng nhập</h1>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Nhập thông tin tài khoản để truy cập hệ thống.
              </p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field data-invalid={Boolean(errors.email)}>
                <FieldLabel htmlFor="email" className="text-muted-foreground text-xs font-semibold">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  aria-invalid={Boolean(errors.email)}
                  autoComplete="email"
                  className="bg-card h-11 rounded-md px-3 text-sm"
                  {...register('email')}
                />
                <FieldError>{errors.email?.message}</FieldError>
              </Field>

              <Field data-invalid={Boolean(errors.password)}>
                <FieldLabel
                  htmlFor="password"
                  className="text-muted-foreground text-xs font-semibold"
                >
                  Mật khẩu
                </FieldLabel>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="current-password"
                  className="bg-card h-11 rounded-md px-3 text-sm"
                  {...register('password')}
                />
                <FieldError>{errors.password?.message}</FieldError>
              </Field>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 h-11 w-full cursor-pointer rounded-lg text-sm font-semibold transition-colors active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <LogIn className="size-4" aria-hidden="true" />
                )}
                Đăng nhập
              </Button>
            </form>

            <p className="text-muted-foreground mt-6 text-center text-sm">
              Chưa có tài khoản?{' '}
              <Link
                href={APP_ROUTES.auth.register}
                className="text-primary font-semibold underline-offset-4 hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
