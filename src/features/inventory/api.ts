import { baseApi } from '@/services/base-api'
import type { ApiResponse, QueryInfo, QueryResult } from '@/types/api'
import type { InventoryItem, InventoryTransaction } from './types'

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<ApiResponse<QueryResult<InventoryItem>>, QueryInfo | void>({
      query: (params) => ({
        url: '/inventory',
        params: params ?? undefined,
      }),
      providesTags: ['Inventory'],
    }),
    getInventoryTransactions: builder.query<ApiResponse<QueryResult<InventoryTransaction>>, QueryInfo | void>({
      query: (params) => ({
        url: '/inventory/transactions',
        params: params ?? undefined,
      }),
      providesTags: ['Inventory', 'AuditLog'],
    }),
  }),
})

export const { useGetInventoryQuery, useGetInventoryTransactionsQuery } = inventoryApi
