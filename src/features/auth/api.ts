import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { LoginRequestDto, LoginResponseDto } from './types'

const login = (body: LoginRequestDto) =>
  axiosClient.post<ApiResponse<LoginResponseDto>>('/auth/login', body).then((r) => r.data)

export function useLoginMutation() {
  return useMutation({ mutationFn: login })
}
