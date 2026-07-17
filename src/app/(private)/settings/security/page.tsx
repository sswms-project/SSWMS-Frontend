import { ShieldCheck } from 'lucide-react'
import { SecurityPage } from '@/features/settings/pages'

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-primary size-6" aria-hidden="true" />
        <div>
          <h2 className="text-foreground text-xl font-semibold">Bảo mật tài khoản</h2>
          <p className="text-muted-foreground text-sm">
            Quản lý xác thực hai yếu tố và các thiết lập bảo mật
          </p>
        </div>
      </div>
      <SecurityPage />
    </div>
  )
}
