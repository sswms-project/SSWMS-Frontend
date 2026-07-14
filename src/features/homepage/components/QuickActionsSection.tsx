import Link from 'next/link'
import type { Route } from 'next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { QuickAction } from '../types'

interface QuickActionsSectionProps {
  actions: QuickAction[]
}

function getIcon(iconName: string): LucideIcon {
  const icon = Icons[iconName as keyof typeof Icons] as LucideIcon | undefined
  return icon ?? Icons.Zap
}

export function QuickActionsSection({ actions }: QuickActionsSectionProps) {
  return (
    <Card className="p-6">
      <h3 className="text-foreground mb-4 text-lg font-semibold">Thao tác nhanh</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = getIcon(action.icon)

          return (
            <Link key={action.id} href={action.href as Route}>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Icon className="size-4 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium">{action.label}</span>
                  <span className="text-muted-foreground text-xs">{action.description}</span>
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}
