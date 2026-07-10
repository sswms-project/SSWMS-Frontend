export const USER_ROLES = {
  SystemAdmin: 'System Admin',
  TenantOwner: 'Tenant Owner',
  WarehouseManager: 'Warehouse Manager',
  WarehouseStaff: 'Warehouse Staff',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
