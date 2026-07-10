import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface ConfirmPasswordHintProps {
  readonly password: string
  readonly confirmPassword: string
}

export function ConfirmPasswordHint({ password, confirmPassword }: ConfirmPasswordHintProps) {
  if (!confirmPassword) return null

  const isMatched = password.length > 0 && password === confirmPassword
  const Icon = isMatched ? CheckCircle2 : AlertCircle

  return (
    <div
      className={
        isMatched
          ? 'text-primary flex items-center gap-2'
          : 'text-destructive flex items-center gap-2'
      }
      aria-live="polite"
    >
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{isMatched ? 'Mật khẩu xác nhận khớp' : 'Mật khẩu xác nhận chưa khớp'}</span>
    </div>
  )
}
