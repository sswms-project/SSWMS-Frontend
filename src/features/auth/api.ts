import { useMutation, useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/lib/axios'
import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  VerifyEmailResponseDto,
} from './types'

const login = (body: LoginRequestDto) =>
  axiosClient.post<ApiResponse<LoginResponseDto>>('/auth/login', body).then((r) => r.data)

const registerTenant = (body: RegisterRequestDto) =>
  axiosClient.post<ApiResponse<RegisterResponseDto>>('/auth/register', body).then((r) => r.data)

const verifyEmail = (token: string) =>
  axiosClient
    .get<ApiResponse<VerifyEmailResponseDto>>('/auth/verify-email', { params: { token } })
    .then((r) => r.data)

export function useLoginMutation() {
  return useMutation({ mutationFn: login })
}

export function useRegisterMutation() {
  return useMutation<ApiResponse<RegisterResponseDto>, ApiErrorResponse, RegisterRequestDto>({
    mutationFn: registerTenant,
  })
}

export function useVerifyEmailQuery(token?: string) {
  return useQuery<ApiResponse<VerifyEmailResponseDto>, ApiErrorResponse>({
    queryKey: ['auth', 'verify-email', token],
    queryFn: () => verifyEmail(token ?? ''),
    enabled: Boolean(token),
    retry: false,
  })
}
