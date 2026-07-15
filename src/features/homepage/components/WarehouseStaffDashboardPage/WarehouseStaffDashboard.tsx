'use client'

import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DashboardHeader } from '../DashboardHeader'
import { MetricCardGrid } from '../MetricCardGrid'
import { QuickActionsBar } from '../QuickActionsBar'
import { AlertCard } from '../AlertCard'
import { StaffTaskTable } from './StaffTaskTable'
import { DateRangeFilter } from '../DateRangeFilter'
import { FadeIn } from '../FadeIn'
import { staffMetrics, staffQuickActions, myTasks } from '../../utils/sample-data'
import { getDefaultMetricsDateRange, filterMetricsByDateRange } from '../../utils/date-range'

export function WarehouseStaffDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultMetricsDateRange())

  const filteredMetrics = useMemo(
    () => filterMetricsByDateRange(staffMetrics, dateRange),
    [dateRange]
  )

  return (
    <div className="space-y-6">
      <FadeIn>
        <DashboardHeader
          title="Bảng điều khiển công việc của tôi"
          description="Nhiệm vụ và công việc được giao hôm nay"
          actions={<DateRangeFilter value={dateRange} onChange={setDateRange} />}
        />
      </FadeIn>

      <FadeIn delay={0.05}>
        <QuickActionsBar actions={staffQuickActions} />
      </FadeIn>

      {/* Task metrics — operational only, no company-wide business figures */}
      <MetricCardGrid metrics={filteredMetrics} />

      <FadeIn delay={0.3}>
        <AlertCard
          type="info"
          title="Nhiệm vụ tiếp theo"
          description="Phiếu lấy hàng #PT-4521 được giao — Zone B, 12 sản phẩm, hạn hoàn thành trong 25 phút."
          actionLabel="Bắt đầu"
        />
      </FadeIn>

      <FadeIn delay={0.35}>
        <StaffTaskTable tasks={myTasks} />
      </FadeIn>
    </div>
  )
}
