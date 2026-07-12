export interface RoleResponse {
  id: string
  roleName: string
  isSystemRole: boolean
  parentRoleId: string | null
  permissions: PermissionResponse[]
}

export interface PermissionResponse {
  id: string
  permissionKey: string
  module: string
}

export interface AssignPermissionsRequest {
  permissionIds: string[]
}
