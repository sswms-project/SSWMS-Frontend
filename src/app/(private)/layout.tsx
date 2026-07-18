import type { Route } from 'next'
import Link from 'next/link'
import { Boxes, LayoutDashboard, Package, Settings, Truck, Warehouse } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { NotificationBell } from '@/components/NotificationBell'
import { PageHeading } from '@/components/PageHeading'
import { PageTransition } from '@/components/PageTransition'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { UserMenu } from '@/components/UserMenu'
import { notifications } from '@/features/homepage/utils/sample-data'
import { APP_ROUTES } from '@/routes/app-routes'
import { AdminNav } from './AdminNav'

const navigation = [
  { href: APP_ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: APP_ROUTES.warehouses, label: 'Warehouses', icon: Warehouse },
  { href: APP_ROUTES.inventory, label: 'Inventory', icon: Boxes },
  { href: APP_ROUTES.orders, label: 'Orders', icon: Package },
  { href: APP_ROUTES.delivery, label: 'Delivery', icon: Truck },
  { href: APP_ROUTES.settings.security, label: 'Cài đặt', icon: Settings },
]

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground min-h-screen">
        <aside className="border-border bg-card fixed inset-y-0 left-0 hidden w-64 border-r lg:block">
          <div className="border-border border-b px-6 py-5">
            <Logo href={null} />
            <p className="text-muted-foreground mt-1.5 text-sm">Vận hành kho</p>
          </div>
          <nav className="space-y-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              )
            })}
            <AdminNav />
          </nav>
        </aside>
        <div className="lg:pl-64">
          <header className="border-border bg-card flex items-center justify-between border-b px-6 py-4">
            <PageHeading />
            <div className="flex items-center gap-2">
              <NotificationBell notifications={notifications} />
              <div className="bg-border h-6 w-px" />
              <UserMenu />
            </div>
          </header>
          <main className="p-6">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
