import { AlertTriangle, Boxes, ClipboardCheck, PackageCheck, Truck, Warehouse } from 'lucide-react'

const metrics = [
  { label: 'Available stock', value: '42,680', detail: 'Across 3 warehouses', icon: Boxes },
  { label: 'Low stock SKUs', value: '18', detail: 'Need reorder review', icon: AlertTriangle },
  { label: 'Inbound today', value: '12', detail: '4 awaiting approval', icon: PackageCheck },
  { label: 'Orders shipping', value: '31', detail: '7 assigned to transport', icon: Truck },
]

const workflows = [
  ['Purchase order PO-1048', 'Confirmed', 'Awaiting goods receipt'],
  ['Outbound order SO-8831', 'Picking', 'Assigned to staff team A'],
  ['Cycle count WH-A-Z2', 'In progress', '128 slots remaining'],
  ['Stock transfer ST-221', 'ReadyToShip', 'From WH-A to WH-C'],
]

export function OperationsDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon

          return (
            <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                <Icon className="size-5 text-emerald-700" aria-hidden="true" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-950">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-500">{metric.detail}</p>
            </article>
          )
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Warehouse className="size-5 text-emerald-700" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Warehouse Activity</h2>
          </div>
          <div className="mt-6 overflow-hidden rounded-md border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase text-slate-500">
              <span>Workflow</span>
              <span>Status</span>
              <span>Next action</span>
            </div>
            {workflows.map(([name, status, action]) => (
              <div key={name} className="grid grid-cols-3 border-t border-slate-200 px-4 py-4 text-sm">
                <span className="font-medium text-slate-950">{name}</span>
                <span className="text-slate-700">{status}</span>
                <span className="text-slate-500">{action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="size-5 text-emerald-700" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-slate-950">Controls Ready</h2>
          </div>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">Tenant scoped API</dt>
              <dd className="font-medium text-slate-950">Enabled</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">RBAC route group</dt>
              <dd className="font-medium text-slate-950">Prepared</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">RTK Query cache tags</dt>
              <dd className="font-medium text-slate-950">Configured</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
