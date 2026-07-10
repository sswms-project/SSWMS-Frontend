import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { passwordRequirements } from '@/features/auth/schemas/register.schema'

interface PasswordRequirementListProps {
  readonly password: string
}

export function PasswordRequirementList({ password }: PasswordRequirementListProps) {
  return (
    <div aria-live="polite">
      <p className="text-foreground mb-2 font-semibold">Mật khẩu cần đáp ứng:</p>
      <ul className="grid gap-1 sm:grid-cols-2">
        {passwordRequirements.map((requirement) => {
          const isMet = requirement.validate(password)
          const Icon = isMet ? CheckCircle2 : Circle

          return (
            <li
              key={requirement.id}
              className={cn('flex items-center gap-2', isMet && 'text-primary')}
            >
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{requirement.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
