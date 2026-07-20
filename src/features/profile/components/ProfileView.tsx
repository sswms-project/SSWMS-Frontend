import {
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Home,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import type { ApiErrorResponse } from '@/types/api'
import type { UserProfile } from '../types/profile.types'

interface ProfileViewProps {
  profile?: UserProfile
  isLoading: boolean
  error: ApiErrorResponse | null
}

function getDisplayName(profile: UserProfile) {
  return profile.fullName
}

function getCompanyName(profile: UserProfile) {
  return profile.companyName ?? 'Not provided'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart[0])
    .join('')
    .toUpperCase()
}

function formatDate(value?: string | null) {
  if (!value) return 'Not provided'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function ProfileView({ profile, isLoading, error }: ProfileViewProps) {
  if (isLoading) {
    return (
      <div className="border-border bg-card flex min-h-80 items-center justify-center rounded-lg border">
        <div className="flex items-center gap-3 text-sm font-medium">
          <Spinner className="text-primary size-5" />
          Đang tải thông tin profile...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <BadgeCheck className="size-4" aria-hidden="true" />
        <AlertTitle>Không thể tải profile</AlertTitle>
        <AlertDescription>
          {error.message ?? 'API /api/auth/me thất bại. Vui lòng thử lại sau.'}
        </AlertDescription>
      </Alert>
    )
  }

  if (!profile) {
    return (
      <Alert>
        <User className="size-4" aria-hidden="true" />
        <AlertTitle>Chưa có dữ liệu profile</AlertTitle>
        <AlertDescription>Không tìm thấy thông tin người dùng hiện tại.</AlertDescription>
      </Alert>
    )
  }

  const displayName = getDisplayName(profile)
  const companyName = getCompanyName(profile)
  const phoneNumber = profile.phoneNumber ?? 'Not provided'
  const birthDate = formatDate(profile.dateOfBirth)
  const address = profile.address ?? 'Not provided'
  const profileItems = [
    { label: 'Tên', value: displayName, icon: User },
    { label: 'Tên công ty', value: companyName, icon: Building2 },
    { label: 'Email', value: profile.email, icon: Mail },
    { label: 'Số điện thoại', value: phoneNumber, icon: Phone },
    { label: 'Ngày sinh', value: birthDate, icon: CalendarDays },
    { label: 'Địa chỉ', value: address, icon: Home },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="border-border bg-card grid gap-6 rounded-lg border p-6 md:grid-cols-[auto_1fr_auto] md:items-center">
        <Avatar className="size-20" size="lg">
          {profile.avatarUrl ? <AvatarImage src={profile.avatarUrl} alt={displayName} /> : null}
          <AvatarFallback className="text-primary text-xl font-semibold">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 space-y-3">
          <div>
            <p className="text-muted-foreground text-sm font-medium">User profile</p>
            <h2 className="text-foreground mt-1 text-2xl font-semibold">{displayName}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{companyName}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Authenticated</Badge>
            <Badge variant="outline">{profile.email}</Badge>
          </div>
        </div>

        <div className="border-border bg-muted text-muted-foreground flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium md:w-auto">
          <CheckCircle2 className="text-primary size-4" aria-hidden="true" />
          Đã xác thực
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              {profileItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="border-border rounded-md border p-4">
                    <dt className="text-muted-foreground flex items-center gap-2 text-xs font-semibold uppercase">
                      <Icon className="text-primary size-4" aria-hidden="true" />
                      {item.label}
                    </dt>
                    <dd className="text-foreground mt-2 text-sm font-medium break-words">
                      {item.value}
                    </dd>
                  </div>
                )
              })}
            </dl>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Thông tin công ty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <Building2 className="text-primary mt-0.5 size-5" aria-hidden="true" />
              <div>
                <p className="text-foreground text-sm font-medium">Tên công ty</p>
                <p className="text-muted-foreground mt-1 text-sm">{companyName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="text-primary mt-0.5 size-5" aria-hidden="true" />
              <div>
                <p className="text-foreground text-sm font-medium">Email liên hệ</p>
                <p className="text-muted-foreground mt-1 text-sm break-words">{profile.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
