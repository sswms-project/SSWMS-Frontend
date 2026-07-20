'use client'

import { ProfileView } from '../components/ProfileView'
import { useProfile } from '../hooks/use-profile'

export function ProfilePage() {
  const { data: profile, isLoading, error } = useProfile()

  return <ProfileView profile={profile} isLoading={isLoading} error={error} />
}
