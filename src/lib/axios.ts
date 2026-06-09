import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiErrorResponse } from '@/types/api'

type PendingRequest = {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-id': 'demo-tenant',
  },
})

// ── Token helpers ──────────────────────────────────────────────

const isClient = typeof window !== 'undefined'

const getAccessToken = (): string | null => (isClient ? localStorage.getItem('access_token') : null)

const getRefreshToken = (): string | null =>
  isClient ? localStorage.getItem('refresh_token') : null

const setTokens = (accessToken: string, refreshToken?: string): void => {
  if (!isClient) return
  localStorage.setItem('access_token', accessToken)
  if (refreshToken) localStorage.setItem('refresh_token', refreshToken)
}

const clearTokens = (): void => {
  if (!isClient) return
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

const redirectToLogin = (): void => {
  clearTokens()
  window.location.href = '/login'
}

// ── Token refresh with queuing ─────────────────────────────────

let isRefreshing = false
let pendingRequests: PendingRequest[] = []

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token')

  const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  })

  return data.access_token
}

const handleTokenRefresh = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      pendingRequests.push({ resolve, reject })
    })
  }

  isRefreshing = true
  try {
    const newToken = await refreshAccessToken()
    setTokens(newToken)
    pendingRequests.forEach((req) => req.resolve(newToken))
    return newToken
  } catch (error) {
    pendingRequests.forEach((req) => req.reject(error))
    redirectToLogin()
    throw error
  } finally {
    pendingRequests = []
    isRefreshing = false
  }
}

// ── Request interceptor ────────────────────────────────────────

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Response interceptor ───────────────────────────────────────

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest?._retry && getRefreshToken()) {
      originalRequest._retry = true
      try {
        const newToken = await handleTokenRefresh()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axiosClient(originalRequest)
      } catch {
        return Promise.reject(error)
      }
    }

    if (error.response?.status === 403) {
      window.location.href = '/forbidden'
    }

    if (!error.response) {
      console.error('Network error:', error.message)
    }

    const apiError: ApiErrorResponse = (error.response?.data as ApiErrorResponse) ?? {
      statusCode: error.response?.status ?? 500,
      message: error.message,
    }

    return Promise.reject(apiError)
  }
)
