import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'

export const baseApi = createApi({
  reducerPath: 'sswmsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-tenant-id', 'demo-tenant')
      return headers
    },
  }),
  tagTypes: [
    'Auth',
    'Warehouse',
    'Product',
    'Inventory',
    'PurchaseOrder',
    'OutboundOrder',
    'Customer',
    'Notification',
    'AuditLog',
    'Subscription',
  ],
  endpoints: () => ({}),
})
