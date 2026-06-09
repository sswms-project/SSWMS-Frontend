import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/lib/axios'
import { queryKeys } from '@/lib/query-keys'
import type { ApiResponse, QueryInfo, QueryResult } from '@/types/api'
import type { Warehouse } from './types'

const getWarehouses = (params?: QueryInfo) =>
  axiosClient
    .get<ApiResponse<QueryResult<Warehouse>>>('/warehouses', { params })
    .then((r) => r.data)

export function useGetWarehousesQuery(params?: QueryInfo) {
  return useQuery({
    queryKey: queryKeys.warehouses.list(params),
    queryFn: () => getWarehouses(params),
  })
}
