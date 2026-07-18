import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppHeader, AppSidebar } from '@/components/layout'
import { PageTransition } from '@/components/PageTransition'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="min-w-0 overflow-x-hidden">
            <AppHeader />
            <div className="min-w-0 flex-1 p-3 sm:p-4 lg:p-5">
              <PageTransition>{children}</PageTransition>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ProtectedRoute>
  )
}
