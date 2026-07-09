export type UserRole = 'Owner' | 'WarehouseManager' | 'Staff' | 'TransportStaff'

export interface AuthUser {
  id: string
  tenantId: string
  fullName: string
  email: string
  role: UserRole
  isActive: boolean
}

export interface LoginRequestDto {
  email: string
  password: string
  tenantCode: string
}

export interface LoginResponseDto {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

export interface RegisterRequestDto {
  tenantName: string
  ownerName: string
  phone: string
  email: string
  address: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export type RegisterResponseDto = string

export type VerifyEmailResponseDto = string
