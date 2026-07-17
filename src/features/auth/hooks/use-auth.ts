import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryKeys } from '@/lib/query-keys'
import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import { authService } from '../services/auth.service'
import type {
  ForgotPasswordRequestDto,
  ForgotPasswordResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  ResetPasswordRequestDto,
  ResetPasswordResponseDto,
  UserProfileResponse,
  VerifyEmailResponseDto,
} from '../types/auth.types'

function logAuthError(action: string, error: ApiErrorResponse) {
  console.warn(`[auth] ${action} failed`, {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
  })
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: authService.login,
    onError: (error: ApiErrorResponse) => {
      logAuthError('login', error)
      toast.error(error.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.')
    },
  })
}

export function useRegisterMutation() {
  return useMutation<ApiResponse<RegisterResponseDto>, ApiErrorResponse, RegisterRequestDto>({
    mutationFn: authService.registerTenant,
    onError: (error) => {
      logAuthError('register', error)
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

export function useForgotPassword() {
  return useMutation<
    ApiResponse<ForgotPasswordResponseDto>,
    ApiErrorResponse,
    ForgotPasswordRequestDto
  >({
    mutationFn: authService.forgotPassword,
    onError: (error) => {
      logAuthError('forgot password', error)
      toast.error(error.message ?? 'Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.')
    },
  })
}

export function useResetPassword() {
  return useMutation<
    ApiResponse<ResetPasswordResponseDto>,
    ApiErrorResponse,
    ResetPasswordRequestDto
  >({
    mutationFn: authService.resetPassword,
    onError: (error) => {
      logAuthError('reset password', error)
      toast.error(error.message ?? 'Không thể đặt lại mật khẩu. Vui lòng thử lại.')
    },
  })
}

export function useMeQuery() {
  return useQuery<UserProfileResponse, ApiErrorResponse>({
    queryKey: queryKeys.auth.me,
    queryFn: () => authService.getMe().then((r) => r.data),
  })
}
