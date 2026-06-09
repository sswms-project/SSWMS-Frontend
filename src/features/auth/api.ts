import { baseApi } from '@/services/base-api'
import type { ApiResponse } from '@/types/api'
import type { LoginRequestDto, LoginResponseDto } from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponseDto>, LoginRequestDto>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation } = authApi
