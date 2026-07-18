'use client'

import { useEffect } from 'react'
import { ShieldQuestion } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useMeQuery } from '@/features/auth/hooks/use-auth'
import { DisableTwoFactorDialog } from './DisableTwoFactorDialog'
import { EnableTwoFactorDialog } from './EnableTwoFactorDialog'

export function TwoFactorCard() {
  const meQuery = useMeQuery()

  useEffect(() => {
    if (!meQuery.error) return
    console.error(meQuery.error)
    toast.error(meQuery.error.message ?? 'Không thể tải thông tin tài khoản. Vui lòng thử lại.')
  }, [meQuery.error])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Xác thực hai yếu tố (2FA)</CardTitle>
        <CardDescription>
          Tăng cường bảo mật tài khoản bằng mã OTP từ ứng dụng xác thực khi đăng nhập.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {meQuery.isLoading && <Skeleton className="h-9 w-full" />}

        {meQuery.isError && !meQuery.isLoading && (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <ShieldQuestion className="size-4" aria-hidden="true" />
            Không thể tải trạng thái xác thực hai yếu tố.
          </div>
        )}

        {meQuery.data && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            {meQuery.data.isTwoFactorEnabled ? (
              <>
                <Badge variant="default">Đã bật</Badge>
                <DisableTwoFactorDialog />
              </>
            ) : (
              <>
                <Badge variant="outline">Chưa bật</Badge>
                <EnableTwoFactorDialog />
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
