import { axiosClient } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiResponse } from '@/types/api'
import type { UserProfile, UserProfileResponse } from '../types/profile.types'

function normalizeProfile(profile: UserProfileResponse): UserProfile {
  return {
    id: profile.id ?? profile.userId ?? profile.user_id ?? '',
    fullName: profile.fullName ?? profile.full_name ?? profile.name ?? 'Current user',
    email: profile.email,
    companyName:
      profile.companyName ??
      profile.company_name ??
      profile.tenantName ??
      profile.tenant_name ??
      profile.organizationName ??
      profile.organization_name ??
      profile.company?.companyName ??
      profile.company?.company_name ??
      profile.company?.name ??
      profile.tenant?.companyName ??
      profile.tenant?.company_name ??
      profile.tenant?.tenantName ??
      profile.tenant?.tenant_name ??
      profile.tenant?.name ??
      null,
    avatarUrl: profile.avatarUrl ?? profile.avatar_url ?? profile.avatar ?? null,
    phoneNumber: profile.phoneNumber ?? profile.phone_number ?? profile.phone ?? null,
    dateOfBirth:
      profile.dateOfBirth ??
      profile.date_of_birth ??
      profile.birthDate ??
      profile.birth_date ??
      null,
    address: profile.address ?? null,
  }
}

export const profileService = {
  getCurrentUser: () =>
    axiosClient.get<ApiResponse<UserProfileResponse>>(API_ENDPOINTS.auth.me).then((response) => ({
      ...response.data,
      data: normalizeProfile(response.data.data),
    })),
}
