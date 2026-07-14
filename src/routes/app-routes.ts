export const APP_ROUTES = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
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
