import { Shield } from 'lucide-react'
import { RolesPage } from '@/features/admin/pages'

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="size-6 text-emerald-700" aria-hidden="true" />
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Phân quyền vai trò</h2>
          <p className="text-sm text-slate-500">Gán quyền cho từng vai trò trong hệ thống</p>
        </div>
      </div>
      <RolesPage />
    </div>
  )
}
