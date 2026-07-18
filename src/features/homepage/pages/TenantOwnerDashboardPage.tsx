'use client'

import { USER_ROLES } from '@/config/roles'
import { RoleGuard } from '../components/RoleGuard'
import { TenantOwnerDashboard } from '../components/TenantOwnerDashboardPage'

export function TenantOwnerDashboardPage() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.TenantOwner]}>
      <TenantOwnerDashboard />
    </RoleGuard>
  )
}
