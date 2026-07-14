'use client'

import { USER_ROLES } from '@/config/roles'
import { RoleGuard } from './RoleGuard'
import { WarehouseManagerDashboard } from './WarehouseManagerDashboard'

export function WarehouseManagerDashboardPage() {
  return (
    <RoleGuard allowedRoles={[USER_ROLES.WarehouseManager]}>
      <WarehouseManagerDashboard />
    </RoleGuard>
  )
}
