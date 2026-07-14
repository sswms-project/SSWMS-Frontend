'use client'

import { MetricCard } from './MetricCard'
import { QuickActionsSection } from './QuickActionsSection'
import { WarehouseStatsCard } from './WarehouseStatsCard'
import { LogisticsFluxChart } from './LogisticsFluxChart'
import { RecentOperationsTable } from './RecentOperationsTable'
import { AlertCard } from './AlertCard'
import { LowStockTable } from './LowStockTable'
import { FadeIn } from './FadeIn'
import {
  warehouseManagerMetrics,
  warehouseManagerQuickActions,
  warehouseStats,
  chartData,
  recentOperations,
  lowStockItems,
} from '../utils/sample-data'

export function WarehouseManagerDashboard() {
  const managerWarehouse = warehouseStats.slice(0, 1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <h1 className="text-foreground text-2xl font-bold">Bảng điều khiển vận hành kho</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tổng quan vận hành theo thời gian thực tại Kho Chính
        </p>
      </FadeIn>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {warehouseManagerMetrics.map((metric, index) => (
          <FadeIn key={metric.label} delay={0.05 + index * 0.05}>
            <MetricCard metric={metric} />
          </FadeIn>
        ))}
      </div>

      {/* Alert Card */}
      <FadeIn delay={0.3}>
        <AlertCard
          type="warning"
          title="Cần chú ý"
          description="Sức chứa Zone C đã đạt 95%. Còn 42 đơn lấy hàng chờ xử lý cho ca tiếp theo — ưu tiên các SKU luân chuyển nhanh."
          actionLabel="Xem sơ đồ khu vực"
        />
      </FadeIn>

      {/* Charts and Quick Actions Row */}
      <FadeIn delay={0.35}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LogisticsFluxChart data={chartData} />
          </div>
          <div className="lg:col-span-1">
            <QuickActionsSection actions={warehouseManagerQuickActions} />
          </div>
        </div>
      </FadeIn>

      {/* Recent Operations */}
      <FadeIn delay={0.4}>
        <RecentOperationsTable operations={recentOperations} />
      </FadeIn>

      {/* Low Stock and Warehouse Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.45}>
          <LowStockTable items={lowStockItems} />
        </FadeIn>

        <FadeIn delay={0.5}>
          <h2 className="text-foreground mb-4 text-lg font-semibold">Tình trạng kho</h2>
          <div className="grid gap-4">
            {managerWarehouse.map((warehouse) => (
              <WarehouseStatsCard key={warehouse.id} warehouse={warehouse} />
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
