'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth.store'
import type { AuthUser } from '../types/auth.types'
import { useLoginMutation } from '../hooks/use-auth'
import type { LoginFormValues } from '../schemas/login.schema'
import { LoginForm } from '../components/LoginPage'

function decodeJwtUser(token: string): AuthUser {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const json = new TextDecoder().decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)))
  const payload = JSON.parse(json)
  return {
    id: payload.user_id ?? payload.sub,
    tenantId: payload.tenant_id,
    fullName: payload.name,
    email: payload.email,
    role: payload.role,
    isActive: true,
  }
}

export function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const loginMutation = useLoginMutation()

  async function handleLogin(values: LoginFormValues) {
    try {
      const response = await loginMutation.mutateAsync(values)
      const { accessToken, refreshToken, requires2FA } = response.data

      if (requires2FA) {
        toast.error('2FA chưa được hỗ trợ trong phiên bản này.')
        return
      }

      const user = decodeJwtUser(accessToken)
      setAuth(user, accessToken, refreshToken)
      router.replace('/dashboard')
    } catch {
      // onError in useLoginMutation handles logging + toast
    }
  }

  return <LoginForm onSubmit={handleLogin} isLoading={loginMutation.isPending} />
}
