import Link from 'next/link'
import { Boxes, LayoutDashboard, Package, Truck, Warehouse } from 'lucide-react'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { APP_ROUTES } from '@/routes/app-routes'

const navigation = [
  { href: APP_ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: APP_ROUTES.warehouses, label: 'Warehouses', icon: Warehouse },
  { href: APP_ROUTES.inventory, label: 'Inventory', icon: Boxes },
  { href: APP_ROUTES.orders, label: 'Orders', icon: Package },
  { href: APP_ROUTES.delivery, label: 'Delivery', icon: Truck },
]

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-100 text-slate-950">
        <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:block">
          <div className="border-b border-slate-200 px-6 py-5">
            <p className="text-lg font-semibold">SSWMS</p>
            <p className="text-sm text-slate-500">Warehouse operations</p>
          </div>
          <nav className="space-y-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>
        <div className="lg:pl-64">
          <header className="border-b border-slate-200 bg-white px-6 py-4">
            <p className="text-sm font-medium text-slate-500">Demo tenant</p>
            <h1 className="text-2xl font-semibold text-slate-950">
              Smart SaaS Warehouse Management
            </h1>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
