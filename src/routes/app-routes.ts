export const APP_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
  },
  dashboard: '/dashboard',
  warehouses: '/warehouses',
  inventory: '/inventory',
  orders: '/orders',
  delivery: '/delivery',
  unauthorized: '/unauthorized',
  admin: {
    roles: '/admin/roles',
  },
} as const
