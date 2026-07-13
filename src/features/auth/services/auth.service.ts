import { axiosClient } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiResponse } from '@/types/api'
import type {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  VerifyEmailResponseDto,
} from '../types/auth.types'

export const authService = {
  login: (body: LoginRequestDto) =>
    axiosClient
      .post<ApiResponse<LoginResponseDto>>(API_ENDPOINTS.auth.login, body)
      .then((r) => r.data),

  registerTenant: (body: RegisterRequestDto) =>
    axiosClient
      .post<ApiResponse<RegisterResponseDto>>(API_ENDPOINTS.auth.register, body)
      .then((r) => r.data),

  verifyEmail: (token: string) =>
    axiosClient
      .get<ApiResponse<VerifyEmailResponseDto>>(API_ENDPOINTS.auth.verifyEmail, {
        params: { token },
      })
      .then((r) => r.data),
}
