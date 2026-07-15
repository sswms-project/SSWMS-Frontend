'use client'

import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DashboardHeader } from '../DashboardHeader'
import { MetricCardGrid } from '../MetricCardGrid'
import { QuickActionsBar } from '../QuickActionsBar'
import { WarehouseCapacitySection } from './WarehouseCapacitySection'
import { DateRangeFilter } from '../DateRangeFilter'
import { LogisticsFluxChart } from '../LogisticsFluxChart'
import { WarehouseRevenueDonutChart } from './WarehouseRevenueDonutChart'
import { RecentOperationsTable } from '../RecentOperationsTable'
import { AlertCard } from '../AlertCard'
import { LowStockTable } from '../LowStockTable'
import { FadeIn } from '../FadeIn'
import {
  tenantOwnerMetrics,
  tenantOwnerQuickActions,
  warehouseStats,
  chartData,
  recentOperations,
  lowStockItems,
} from '../../utils/sample-data'
import { getDefaultMetricsDateRange, filterMetricsByDateRange } from '../../utils/date-range'

export function TenantOwnerDashboard() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultMetricsDateRange())

  const filteredMetrics = useMemo(
    () => filterMetricsByDateRange(tenantOwnerMetrics, dateRange),
    [dateRange]
  )

  return (
    <div className="space-y-6">
      <FadeIn>
        <DashboardHeader
          title="Bảng điều khiển vận hành kho"
          description="Tổng quan chuỗi cung ứng theo thời gian thực cho tất cả các kho"
          actions={<DateRangeFilter value={dateRange} onChange={setDateRange} />}
        />
      </FadeIn>

      <FadeIn delay={0.05}>
        <QuickActionsBar actions={tenantOwnerQuickActions} />
      </FadeIn>

      <MetricCardGrid metrics={filteredMetrics} />

      <FadeIn delay={0.3}>
        <AlertCard
          type="info"
          title="Đề xuất thông minh"
          description="Đề xuất nhập thêm SKU-182 tại Zone A — dự báo nhu cầu cao cho ca làm việc tiếp theo."
          actionLabel="Thực hiện nhập kho"
        />
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LogisticsFluxChart data={chartData} />
          </div>
          <div className="lg:col-span-1">
            <WarehouseRevenueDonutChart warehouses={warehouseStats} />
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <RecentOperationsTable operations={recentOperations} />
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.45}>
          <LowStockTable items={lowStockItems} />
        </FadeIn>

        <FadeIn delay={0.5}>
          <WarehouseCapacitySection warehouses={warehouseStats} />
        </FadeIn>
      </div>
    </div>
  )
}
