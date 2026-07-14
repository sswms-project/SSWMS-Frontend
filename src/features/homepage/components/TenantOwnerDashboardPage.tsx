'use client'

import { USER_ROLES } from '@/config/roles'
import { RoleGuard } from './RoleGuard'
import { TenantOwnerDashboard } from './TenantOwnerDashboard'

export function TenantOwnerDashboardPage() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.TenantOwner, USER_ROLES.SystemAdmin]}>
      <TenantOwnerDashboard />
    </RoleGuard>
  )
}
