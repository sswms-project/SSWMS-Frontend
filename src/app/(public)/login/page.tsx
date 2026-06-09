'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/atoms/button'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login.schema'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      tenantCode: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: LoginFormValues) {
    console.info('Login payload ready for RTK Query mutation', values)
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <p className="text-sm font-medium text-emerald-700">SSWMS</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Sign in</h1>
        </div>
        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Tenant code
            <input
              className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-slate-950 outline-none focus:border-emerald-700"
              {...register('tenantCode')}
            />
            {errors.tenantCode && <span className="mt-1 block text-xs text-red-600">{errors.tenantCode.message}</span>}
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-slate-950 outline-none focus:border-emerald-700"
              {...register('email')}
            />
            {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email.message}</span>}
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              className="mt-2 h-10 w-full rounded-md border border-slate-300 px-3 text-slate-950 outline-none focus:border-emerald-700"
              {...register('password')}
            />
            {errors.password && <span className="mt-1 block text-xs text-red-600">{errors.password.message}</span>}
          </label>
        </div>
        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
          <LogIn className="size-4" aria-hidden="true" />
          Sign in
        </Button>
      </form>
    </main>
  )
}
