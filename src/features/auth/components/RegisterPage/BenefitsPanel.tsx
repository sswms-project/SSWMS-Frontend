import { Rocket, ShieldCheck } from 'lucide-react'
import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription } from '@/components/ui/card'

const warehouseVisualUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNB9ii5e04oPKxDw8BflJrd37LtYxdqM5OLE-ECfVe7LAcIVfoUS7yHRGX_9auGqNY_tPSZjH-zi3T-NDTWo7kQkYGS-zV_5-MZD-IXkyeQ-pkzOXIEUfvfgXBeNl2L9B6r0S3jbYDwrtfwyXPYc7gXTGBv28HgsQGmAGYVEYh5euVNUaemcHcNDNJY7nwvp8mcOCJawFWF7GnP2igfWDmC7Glr4v9AsWP5MEMynD_dio68r_r4TJ31TaKgqb0a81psIFwzzsaLNY'

interface BenefitCardProps {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  readonly title: string
  readonly description: string
  readonly accent?: boolean
}

function BenefitCard({ icon: Icon, title, description, accent = false }: BenefitCardProps) {
  return (
    <Card className="rounded-lg">
      <CardContent className="p-4">
        <Icon
          className={accent ? 'text-secondary size-5' : 'text-primary size-5'}
          aria-hidden="true"
        />
        <strong className="text-foreground mt-3 block text-sm font-semibold">{title}</strong>
        <CardDescription className="mt-1 text-xs leading-5">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

export function BenefitsPanel() {
  return (
    <>
      <Card className="relative flex min-h-[280px] flex-1 overflow-hidden rounded-lg xl:min-h-[320px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${warehouseVisualUrl})` }}
          role="img"
          aria-label="Kho hàng tự động hiện đại với ánh sáng xanh cyan"
        />
        <div className="from-primary/90 via-primary/30 absolute inset-0 bg-gradient-to-t to-transparent" />
        <footer className="text-primary-foreground relative mt-auto p-5 xl:p-6">
          <Badge className="bg-primary-foreground/15 text-primary-foreground mb-2 rounded-md border-0 backdrop-blur-sm">
            Operational Intelligence
          </Badge>
          <h2 className="text-2xl leading-8 font-semibold">Quản trị kho bãi thế hệ mới</h2>
          <CardDescription className="text-primary-foreground/90 mt-2 max-w-sm text-sm leading-5">
            Nền tảng vận hành tập trung giúp kiểm soát tồn kho, vận chuyển và nhân sự trong một giao
            diện thống nhất.
          </CardDescription>
        </footer>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <BenefitCard
          icon={ShieldCheck}
          title="Bảo mật đa tầng"
          description="Xác minh email và quản trị truy cập theo tenant."
        />
        <BenefitCard
          icon={Rocket}
          title="Triển khai nhanh"
          description="Khởi tạo workspace và owner trong một lần đăng ký."
          accent
        />
      </div>
    </>
  )
}
