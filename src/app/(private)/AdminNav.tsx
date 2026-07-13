'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { USER_ROLES } from '@/config/roles'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

export function AdminNav() {
  const user = useAuthStore((state) => state.user)

  if (user?.role !== USER_ROLES.SystemAdmin) return null

  return (
    <>
      <div className="border-border/60 my-2 border-t" />
      <p className="text-muted-foreground/70 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
        Quản trị hệ thống
      </p>
      <Link
        href={APP_ROUTES.admin.roles}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
      >
        <Shield className="size-4" aria-hidden="true" />
        Phân quyền
      </Link>
    </>
  )
}
