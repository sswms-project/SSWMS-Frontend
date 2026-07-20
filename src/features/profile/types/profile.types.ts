export interface UserProfile {
  id: string
  fullName: string
  email: string
  companyName: string | null
  avatarUrl: string | null
  phoneNumber: string | null
  dateOfBirth: string | null
  address?: string | null
}

export interface UserProfileResponse {
  id?: string
  userId?: string
  user_id?: string
  fullName?: string
  full_name?: string
  name?: string
  email: string
  companyName?: string | null
  company_name?: string | null
  tenantName?: string | null
  tenant_name?: string | null
  organizationName?: string | null
  organization_name?: string | null
  avatarUrl?: string | null
  avatar_url?: string | null
  avatar?: string | null
  phoneNumber?: string | null
  phone_number?: string | null
  phone?: string | null
  dateOfBirth?: string | null
  date_of_birth?: string | null
  birthDate?: string | null
  birth_date?: string | null
  address?: string | null
  company?: {
    name?: string | null
    companyName?: string | null
    company_name?: string | null
  } | null
  tenant?: {
    name?: string | null
    companyName?: string | null
    company_name?: string | null
    tenantName?: string | null
    tenant_name?: string | null
  } | null
}
