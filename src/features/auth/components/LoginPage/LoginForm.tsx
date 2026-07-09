'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn, Warehouse } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'

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
    <main className="bg-background text-foreground grid min-h-[100dvh] place-items-center p-6">
      <Card className="border-border bg-card w-full max-w-md rounded-lg border shadow-sm">
        <CardContent className="px-6 py-8">
          <div className="flex items-center gap-2">
            <Warehouse className="text-primary size-6" aria-hidden="true" />
            <span className="text-primary text-sm font-semibold">SSWMS</span>
          </div>
          <h1 className="text-foreground mt-3 text-2xl font-semibold">Đăng nhập</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Nhập thông tin tài khoản để truy cập hệ thống.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="email" className="text-muted-foreground text-xs font-semibold">
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className="h-11 rounded-md px-3 text-sm"
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
                className="h-11 rounded-md px-3 text-sm"
                {...register('password')}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 h-11 w-full rounded-md text-sm font-semibold"
              disabled={isLoading}
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
              href="/register"
              className="text-primary font-semibold underline-offset-4 hover:underline"
            >
              Đăng ký
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
