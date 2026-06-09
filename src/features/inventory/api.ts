import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/lib/axios'
import { queryKeys } from '@/lib/query-keys'
import type { ApiResponse, QueryInfo, QueryResult } from '@/types/api'
import type { InventoryItem, InventoryTransaction } from './types'

const getInventory = (params?: QueryInfo) =>
  axiosClient
    .get<ApiResponse<QueryResult<InventoryItem>>>('/inventory', { params })
    .then((r) => r.data)

const getInventoryTransactions = (params?: QueryInfo) =>
  axiosClient
    .get<ApiResponse<QueryResult<InventoryTransaction>>>('/inventory/transactions', { params })
    .then((r) => r.data)

export function useGetInventoryQuery(params?: QueryInfo) {
  return useQuery({
    queryKey: queryKeys.inventory.list(params),
    queryFn: () => getInventory(params),
  })
}

export function useGetInventoryTransactionsQuery(params?: QueryInfo) {
  return useQuery({
    queryKey: queryKeys.inventory.transactions(params),
    queryFn: () => getInventoryTransactions(params),
  })
}
