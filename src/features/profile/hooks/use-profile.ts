import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/types/api'
import type { UserProfile } from '../types/profile.types'
import { profileService } from '../services/profile.service'

const PROFILE_QUERY_KEY = ['auth', 'me'] as const

export function useProfile() {
  const query = useQuery<UserProfile, ApiErrorResponse>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => profileService.getCurrentUser().then((response) => response.data),
    retry: false,
  })

  useEffect(() => {
    if (!query.error) return

    console.error(query.error)
    toast.error(query.error.message ?? 'Khong the tai thong tin profile. Vui long thu lai.')
  }, [query.error])

  return query
}
