import { axiosClient } from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type {
  AssignPermissionsRequest,
  PermissionResponse,
  RoleResponse,
} from '../types/admin.types'

export const adminService = {
  getRoles: () => axiosClient.get<ApiResponse<RoleResponse[]>>('/roles').then((r) => r.data),

  getPermissions: () =>
    axiosClient.get<ApiResponse<PermissionResponse[]>>('/permissions').then((r) => r.data),

  assignPermissions: (roleId: string, body: AssignPermissionsRequest) =>
    axiosClient.put<ApiResponse<void>>(`/roles/${roleId}/permissions`, body).then((r) => r.data),
}
