import { baseApi } from '@/services/base-api'
import type { ApiResponse, QueryInfo, QueryResult } from '@/types/api'
import type { Warehouse } from './types'

export const warehouseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query<ApiResponse<QueryResult<Warehouse>>, QueryInfo | void>({
      query: (params) => ({
        url: '/warehouses',
        params: params ?? undefined,
      }),
      providesTags: ['Warehouse'],
    }),
  }),
})

export const { useGetWarehousesQuery } = warehouseApi
