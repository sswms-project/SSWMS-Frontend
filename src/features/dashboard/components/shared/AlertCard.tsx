'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react'

interface AlertCardProps {
  type: 'warning' | 'info' | 'success'
  title: string
  description: string
  actionLabel: string
  onAction?: () => void
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600',
  },
  info: {
    icon: Zap,
    bg: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
  },
}

export function AlertCard({ type, title, description, actionLabel, onAction }: AlertCardProps) {
  const config = alertConfig[type]
  const Icon = config.icon

  return (
    <Card className={`${config.bg} border-2 p-5`}>
      <div className="flex items-start gap-4">
        <Icon className={`${config.iconColor} mt-0.5 size-5 flex-shrink-0`} />

        <div className="flex-grow">
          <h4 className="text-foreground text-sm font-semibold tracking-wide uppercase">{title}</h4>
          <p className="text-foreground/80 mt-2 text-sm leading-relaxed">{description}</p>

          {actionLabel && (
            <Button size="sm" variant="default" className="mt-4" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
