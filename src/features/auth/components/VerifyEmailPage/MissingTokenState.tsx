import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function MissingTokenState() {
  return (
    <div className="flex min-h-[360px] flex-col justify-center">
      <div className="bg-error-container text-destructive mx-auto flex size-20 items-center justify-center rounded-full">
        <AlertCircle className="size-10" aria-hidden="true" />
      </div>
      <div className="mt-6 text-center">
        <p className="text-destructive text-xs font-semibold">Thiếu token xác minh</p>
        <h2 className="text-foreground mt-2 text-2xl leading-8 font-semibold">
          Link email chưa đầy đủ
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-6">
          Vui lòng mở đúng link xác minh được gửi tới email sau khi đăng ký tài khoản SSWMS.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/register">Quay lại đăng ký</Link>
        </Button>
      </div>
    </div>
  )
}
