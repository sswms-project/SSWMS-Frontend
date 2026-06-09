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
