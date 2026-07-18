import Link from 'next/link'
import type { Route } from 'next'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { QuickAction } from '../types'

interface QuickActionsBarProps {
  actions: QuickAction[]
}

function getIcon(iconName: string): LucideIcon {
  const icon = Icons[iconName as keyof typeof Icons] as LucideIcon | undefined
  return icon ?? Icons.Zap
}

export function QuickActionsBar({ actions }: QuickActionsBarProps) {
  return (
    <div className="border-border bg-card flex gap-2 overflow-x-auto rounded-md border p-2">
      {actions.map((action) => {
        const Icon = getIcon(action.icon)

        return (
          <Link
            key={action.id}
            href={action.href as Route}
            title={action.description}
            className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 flex shrink-0 items-center gap-2 rounded-none px-3 py-2 text-sm font-medium transition-all duration-150 ease-out hover:scale-[1.03] focus-visible:ring-1"
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {action.label}
          </Link>
        )
      })}
    </div>
  )
}
