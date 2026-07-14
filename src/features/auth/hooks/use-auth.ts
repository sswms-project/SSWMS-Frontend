import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import { authService } from '../services/auth.service'
import type {
  RegisterRequestDto,
  RegisterResponseDto,
  VerifyEmailResponseDto,
} from '../types/auth.types'

export function useLoginMutation() {
  return useMutation({
    mutationFn: authService.login,
    onError: (error: ApiErrorResponse) => {
      console.error(error)
      toast.error(error.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.')
    },
  })
}

export function useRegisterMutation() {
  return useMutation<ApiResponse<RegisterResponseDto>, ApiErrorResponse, RegisterRequestDto>({
    mutationFn: authService.registerTenant,
    onError: (error) => {
      console.error(error)
      toast.error(error.message ?? 'Không thể đăng ký tài khoản. Vui lòng thử lại.')
    },
  })
}

export function useVerifyEmailQuery(token?: string) {
  return useQuery<ApiResponse<VerifyEmailResponseDto>, ApiErrorResponse>({
    queryKey: ['auth', 'verify-email', token],
    queryFn: () => authService.verifyEmail(token ?? ''),
    enabled: Boolean(token),
    retry: false,
  })
}
