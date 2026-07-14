'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

export function ProtectedRoute({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true)
      return
    }
    return useAuthStore.persist.onFinishHydration(() => setHasHydrated(true))
  }, [])

  useEffect(() => {
    if (hasHydrated && !user) router.replace(APP_ROUTES.auth.login)
  }, [hasHydrated, user, router])

  if (!hasHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
