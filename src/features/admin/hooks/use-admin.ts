import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/types/api'
import { adminService } from '../services/admin.service'
import type { AssignPermissionsRequest } from '../types/admin.types'

const KEYS = {
  roles: ['admin', 'roles'] as const,
  permissions: ['admin', 'permissions'] as const,
}

export function useRolesQuery() {
  return useQuery({
    queryKey: KEYS.roles,
    queryFn: () => adminService.getRoles().then((r) => r.data),
  })
}

export function usePermissionsQuery() {
  return useQuery({
    queryKey: KEYS.permissions,
    queryFn: () => adminService.getPermissions().then((r) => r.data),
  })
}

export function useAssignPermissionsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ roleId, body }: { roleId: string; body: AssignPermissionsRequest }) =>
      adminService.assignPermissions(roleId, body),
    onSuccess: () => {
      toast.success('Cập nhật quyền thành công')
      queryClient.invalidateQueries({ queryKey: KEYS.roles })
    },
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Cập nhật quyền thất bại')
    },
  })
}
