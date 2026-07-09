import { CheckCircle2, MailCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SuccessStateProps {
  readonly message: string
}

function isAlreadyVerified(message: string) {
  return message.toLowerCase().includes('trước đó')
}

export function SuccessState({ message }: SuccessStateProps) {
  const alreadyVerified = isAlreadyVerified(message)

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
      <div className="bg-accent text-primary flex size-20 items-center justify-center rounded-full">
        {alreadyVerified ? (
          <MailCheck className="size-10" aria-hidden="true" />
        ) : (
          <CheckCircle2 className="size-10" aria-hidden="true" />
        )}
      </div>
      <p className="text-primary mt-6 text-xs font-semibold">
        {alreadyVerified ? 'Email đã được xác minh' : 'Xác minh thành công'}
      </p>
      <h2 className="text-foreground mt-2 text-2xl leading-8 font-semibold">
        Tài khoản đã sẵn sàng đăng nhập
      </h2>
      <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">{message}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/login">Đến trang đăng nhập</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-secondary text-secondary hover:bg-muted h-11 rounded-md px-5 text-sm font-semibold"
        >
          <Link href="/register">Tạo tenant khác</Link>
        </Button>
      </div>
    </div>
  )
}
