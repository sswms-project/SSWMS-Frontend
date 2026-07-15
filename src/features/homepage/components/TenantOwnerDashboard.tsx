'use client'

import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { MetricCard } from './MetricCard'
import { QuickActionsBar } from './QuickActionsBar'
import { WarehouseStatsCard } from './WarehouseStatsCard'
import { WarehouseFilter, ALL_WAREHOUSES_VALUE } from './WarehouseFilter'
import { DateRangeFilter } from './DateRangeFilter'
import { LogisticsFluxChart } from './LogisticsFluxChart'
import { WarehouseRevenueDonutChart } from './WarehouseRevenueDonutChart'
import { RecentOperationsTable } from './RecentOperationsTable'
import { AlertCard } from './AlertCard'
import { LowStockTable } from './LowStockTable'
import { FadeIn } from './FadeIn'
import {
  tenantOwnerMetrics,
  tenantOwnerQuickActions,
  warehouseStats,
  chartData,
  recentOperations,
  lowStockItems,
} from '../utils/sample-data'
import { getDefaultMetricsDateRange, filterMetricsByDateRange } from '../utils/date-range'

export function TenantOwnerDashboard() {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(ALL_WAREHOUSES_VALUE)
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultMetricsDateRange())

  const filteredWarehouses = useMemo(
    () =>
      selectedWarehouseId === ALL_WAREHOUSES_VALUE
        ? warehouseStats
        : warehouseStats.filter((warehouse) => warehouse.id === selectedWarehouseId),
    [selectedWarehouseId]
  )

  const filteredMetrics = useMemo(
    () => filterMetricsByDateRange(tenantOwnerMetrics, dateRange),
    [dateRange]
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold">Bảng điều khiển vận hành kho</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Tổng quan chuỗi cung ứng theo thời gian thực cho tất cả các kho
            </p>
          </div>
          <DateRangeFilter value={dateRange} onChange={setDateRange} />
        </div>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.05}>
        <QuickActionsBar actions={tenantOwnerQuickActions} />
      </FadeIn>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredMetrics.map((metric, index) => (
          <FadeIn key={metric.label} delay={0.05 + index * 0.05}>
            <MetricCard metric={metric} />
          </FadeIn>
        ))}
      </div>

      {/* Alert Card */}
      <FadeIn delay={0.3}>
        <AlertCard
          type="info"
          title="Đề xuất thông minh"
          description="Đề xuất nhập thêm SKU-182 tại Zone A — dự báo nhu cầu cao cho ca làm việc tiếp theo."
          actionLabel="Thực hiện nhập kho"
        />
      </FadeIn>

      {/* Charts Row */}
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

      {/* Recent Operations */}
      <FadeIn delay={0.4}>
        <RecentOperationsTable operations={recentOperations} />
      </FadeIn>

      {/* Low Stock and Warehouse Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.45}>
          <LowStockTable items={lowStockItems} />
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-foreground text-lg font-semibold">Sức chứa kho</h2>
            <WarehouseFilter
              warehouses={warehouseStats}
              value={selectedWarehouseId}
              onChange={setSelectedWarehouseId}
            />
          </div>
          <div className="grid gap-4">
            {filteredWarehouses.map((warehouse) => (
              <WarehouseStatsCard key={warehouse.id} warehouse={warehouse} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
