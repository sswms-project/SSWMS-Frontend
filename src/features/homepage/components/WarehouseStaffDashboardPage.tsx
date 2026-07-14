'use client'

import { USER_ROLES } from '@/config/roles'
import { RoleGuard } from './RoleGuard'
import { WarehouseStaffDashboard } from './WarehouseStaffDashboard'

export function WarehouseStaffDashboardPage() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.WarehouseStaff]}>
      <WarehouseStaffDashboard />
    </RoleGuard>
  )
}
