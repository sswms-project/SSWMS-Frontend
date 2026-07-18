'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/config/roles'
import { useAuthStore } from '@/stores/auth.store'
import { getDashboardRouteForRole } from '../utils/role-routes'

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isAllowed = !!user && allowedRoles.includes(user.role)

  useEffect(() => {
    if (user && !isAllowed) router.replace(getDashboardRouteForRole(user.role))
  }, [user, isAllowed, router])

  if (!isAllowed) return null

  return <>{children}</>
}
