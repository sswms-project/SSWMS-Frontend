import type { DashboardMetric } from '../types'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  metric: DashboardMetric
}

export function MetricCard({ metric }: MetricCardProps) {
  const isPositiveChange = metric.change ? metric.change > 0 : false

  return (
    <Card className="border-border bg-card hover:ring-primary/30 p-6 transition-shadow duration-200">
      <div className="flex h-full flex-col space-y-4">
        <div className="flex items-start justify-between">
          <p className="text-muted-foreground line-clamp-2 min-h-10 text-sm font-semibold tracking-wide uppercase">
            {metric.label}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-foreground text-4xl font-bold">{metric.value}</p>

          {metric.change !== undefined && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {isPositiveChange ? (
                <TrendingUp className="size-4 shrink-0 text-green-600" />
              ) : (
                <TrendingDown className="size-4 shrink-0 text-red-600" />
              )}
              <span
                className={`shrink-0 text-sm font-semibold ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}
              >
                {isPositiveChange ? '+' : ''}
                {metric.change}%
              </span>
              {metric.changeLabel && (
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {metric.changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
