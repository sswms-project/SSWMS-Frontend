import { Shield } from 'lucide-react'
import { RolesPage } from '@/features/admin/pages'

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="text-primary size-6" aria-hidden="true" />
        <div>
          <h2 className="text-foreground text-xl font-semibold">Phân quyền vai trò</h2>
          <p className="text-muted-foreground text-sm">Gán quyền cho từng vai trò trong hệ thống</p>
        </div>
      </div>
      <RolesPage />
    </div>
  )
}
