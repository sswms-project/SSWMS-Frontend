import { CheckCircle2, Circle } from 'lucide-react'
import { passwordRequirements } from '@/features/auth/schemas/register.schema'

interface PasswordRequirementListProps {
  readonly password: string
}

export function PasswordRequirementList({ password }: PasswordRequirementListProps) {
  return (
    <div aria-live="polite">
      <p className="text-foreground mb-2 font-semibold">Mật khẩu cần đáp ứng:</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {passwordRequirements.map((requirement) => {
          const isMet = requirement.validate(password)
          const Icon = isMet ? CheckCircle2 : Circle

          return (
            <li
              key={requirement.id}
              className={isMet ? 'text-primary flex items-center gap-2' : 'flex items-center gap-2'}
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
