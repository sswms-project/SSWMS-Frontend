'use client'

import { MetricCard } from './MetricCard'
import { QuickActionsSection } from './QuickActionsSection'
import { AlertCard } from './AlertCard'
import { StaffTaskTable } from './StaffTaskTable'
import { FadeIn } from './FadeIn'
import { staffMetrics, staffQuickActions, myTasks } from '../utils/sample-data'

export function WarehouseStaffDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <h1 className="text-foreground text-2xl font-bold">Bảng điều khiển công việc của tôi</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Nhiệm vụ và công việc được giao hôm nay
        </p>
      </FadeIn>

      {/* Task Metrics — operational only, no company-wide business figures */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {staffMetrics.map((metric, index) => (
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

      {/* Quick Actions and My Tasks */}
      <FadeIn delay={0.35}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <QuickActionsSection actions={staffQuickActions} />
          </div>
          <div className="lg:col-span-2">
            <StaffTaskTable tasks={myTasks} />
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
