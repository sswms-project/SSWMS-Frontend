import { AlertCircle, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  readonly message: string
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex min-h-[360px] flex-col justify-center">
      <div className="bg-error-container text-destructive mx-auto flex size-20 items-center justify-center rounded-full">
        <AlertCircle className="size-10" aria-hidden="true" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-destructive text-xs font-semibold">Không thể xác minh email</p>
        <h2 className="text-foreground mt-2 text-2xl leading-8 font-semibold">
          Link xác minh không còn hợp lệ
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">{message}</p>
      </div>
      <Alert className="border-border bg-muted text-foreground mt-7 rounded-md">
        <AlertCircle className="text-destructive size-4" aria-hidden="true" />
        <AlertTitle>Gợi ý xử lý</AlertTitle>
        <AlertDescription>
          Nếu link đã hết hạn, hãy đăng ký lại để nhận email xác minh mới hoặc liên hệ quản trị viên
          hệ thống.
        </AlertDescription>
      </Alert>
      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/register">
            <RotateCcw className="size-4" aria-hidden="true" />
            Đăng ký lại
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-secondary text-secondary hover:bg-muted h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/login">Về trang đăng nhập</Link>
        </Button>
      </div>
    </div>
  )
}
