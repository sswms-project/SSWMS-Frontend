'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { StaffTask } from '../../types'

interface StaffTaskTableProps {
  tasks: StaffTask[]
}

const statusConfig = {
  pending: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'CHỜ XỬ LÝ' },
  in_progress: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'ĐANG THỰC HIỆN' },
  completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'HOÀN TẤT' },
}

const taskTypeLabels = {
  Picking: 'Lấy hàng',
  Packing: 'Đóng gói',
  Putaway: 'Cất hàng',
}

export function StaffTaskTable({ tasks }: StaffTaskTableProps) {
  return (
    <Card className="border-border bg-card">
      <div className="border-border border-b px-6 py-4">
        <h3 className="text-foreground text-lg font-semibold">Công việc của tôi</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-border border-b">
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-semibold uppercase">
                Công việc
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-semibold uppercase">
                SKU
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-semibold uppercase">
                Vị trí
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-semibold uppercase">
                Hạn hoàn thành
              </th>
              <th className="text-muted-foreground px-6 py-3 text-left text-xs font-semibold uppercase">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const statusStyle = statusConfig[task.status]
              return (
                <tr
                  key={task.id}
                  className="border-border hover:bg-muted/30 border-b transition-colors"
                >
                  <td className="text-foreground px-6 py-4 text-sm font-semibold">
                    {taskTypeLabels[task.type]}
                  </td>
                  <td className="text-foreground px-6 py-4 font-mono text-sm">{task.sku}</td>
                  <td className="text-muted-foreground px-6 py-4 text-xs">{task.location}</td>
                  <td className="text-muted-foreground px-6 py-4 text-xs">{task.dueTime}</td>
                  <td className="px-6 py-4">
                    <Badge
                      className={`${statusStyle.bg} ${statusStyle.text} border-0 text-xs font-semibold`}
                    >
                      {statusStyle.label}
                    </Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
