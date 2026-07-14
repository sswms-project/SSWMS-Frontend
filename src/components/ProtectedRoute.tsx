'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useSyncExternalStore } from 'react'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

function subscribeToHydration() {
  return () => {}
}

export function ProtectedRoute({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )

  useEffect(() => {
    if (hydrated && !user) router.replace(APP_ROUTES.auth.login)
  }, [hydrated, user, router])

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
