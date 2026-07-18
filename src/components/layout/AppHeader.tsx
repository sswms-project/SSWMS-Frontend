import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { NotificationBell } from '@/components/NotificationBell'
import { PageHeading } from '@/components/PageHeading'
import { ThemeToggle } from './ThemeToggle'
import { UserMenu } from '@/components/UserMenu'
import { notifications } from '@/features/dashboard/utils/sample-data'

export function AppHeader() {
  return (
    <header
      className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b bg-white/80 px-4 backdrop-blur-sm"
      style={{ borderColor: 'var(--outline-variant)' }}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-1 h-4" />
        <PageHeading />
      </div>
      <div className="flex items-center gap-1">
        <NotificationBell notifications={notifications} />
        <ThemeToggle />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <UserMenu />
      </div>
    </header>
  )
}
