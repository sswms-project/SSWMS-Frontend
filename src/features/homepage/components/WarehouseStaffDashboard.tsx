'use client'

import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { MetricCard } from './MetricCard'
import { QuickActionsBar } from './QuickActionsBar'
import { AlertCard } from './AlertCard'
import { StaffTaskTable } from './StaffTaskTable'
import { DateRangeFilter } from './DateRangeFilter'
import { FadeIn } from './FadeIn'
import { staffMetrics, staffQuickActions, myTasks } from '../utils/sample-data'
import { getDefaultMetricsDateRange, filterMetricsByDateRange } from '../utils/date-range'

export function WarehouseStaffDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultMetricsDateRange())

  const filteredMetrics = useMemo(
    () => filterMetricsByDateRange(staffMetrics, dateRange),
    [dateRange]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold">
              Bảng điều khiển công việc của tôi
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Nhiệm vụ và công việc được giao hôm nay
            </p>
          </div>
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.05}>
        <QuickActionsBar actions={staffQuickActions} />
      </FadeIn>

      {/* Task Metrics — operational only, no company-wide business figures */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredMetrics.map((metric, index) => (
          <FadeIn key={metric.label} delay={0.05 + index * 0.05}>
            <MetricCard metric={metric} />
          </FadeIn>
        ))}
      </div>

      {/* Next Task Alert */}
      <FadeIn delay={0.3}>
        <AlertCard
          type="info"
          title="Nhiệm vụ tiếp theo"
          description="Phiếu lấy hàng #PT-4521 được giao — Zone B, 12 sản phẩm, hạn hoàn thành trong 25 phút."
          actionLabel="Bắt đầu"
        />
      </FadeIn>

      {/* My Tasks */}
      <FadeIn delay={0.35}>
        <StaffTaskTable tasks={myTasks} />
      </FadeIn>
    </div>
  )
}
