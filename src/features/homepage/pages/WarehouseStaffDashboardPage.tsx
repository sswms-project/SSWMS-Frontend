'use client'

import { USER_ROLES } from '@/config/roles'
import { RoleGuard } from '../components/RoleGuard'
import { WarehouseStaffDashboard } from '../components/WarehouseStaffDashboardPage'

export function WarehouseStaffDashboardPage() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.WarehouseStaff]}>
      <WarehouseStaffDashboard />
    </RoleGuard>
  )
}
