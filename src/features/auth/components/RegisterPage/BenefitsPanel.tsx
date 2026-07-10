import { CheckCircle2, Warehouse } from 'lucide-react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { APP_ROUTES } from '@/routes/app-routes'

const warehouseVisualUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNB9ii5e04oPKxDw8BflJrd37LtYxdqM5OLE-ECfVe7LAcIVfoUS7yHRGX_9auGqNY_tPSZjH-zi3T-NDTWo7kQkYGS-zV_5-MZD-IXkyeQ-pkzOXIEUfvfgXBeNl2L9B6r0S3jbYDwrtfwyXPYc7gXTGBv28HgsQGmAGYVEYh5euVNUaemcHcNDNJY7nwvp8mcOCJawFWF7GnP2igfWDmC7Glr4v9AsWP5MEMynD_dio68r_r4TJ31TaKgqb0a81psIFwzzsaLNY'

const trustPoints = [
  {
    label: 'Bảo mật đa tầng',
    desc: 'Xác minh email và quản trị truy cập theo từng tenant',
  },
  {
    label: 'Triển khai nhanh',
    desc: 'Khởi tạo workspace và owner trong một lần đăng ký',
  },
  {
    label: 'Vận hành tập trung',
    desc: 'Kiểm soát tồn kho, vận chuyển và nhân sự trong một giao diện',
  },
]

export function BenefitsPanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#003f4d]">
      {/* Background image with dim overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: `url(${warehouseVisualUrl})` }}
        role="img"
        aria-label="Kho hàng tự động hiện đại"
      />
      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#003f4d] via-transparent to-transparent" />

      <div className="relative flex h-full flex-col p-8 xl:p-12">
        {/* Logo */}
        <Link
          href={APP_ROUTES.auth.login}
          className="flex items-center gap-2.5 text-white"
          aria-label="SSWMS"
        >
          <Warehouse className="size-7" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight">SSWMS</span>
        </Link>

        {/* Hero text */}
        <div className="flex flex-1 flex-col justify-center">
          <span className="mb-4 text-xs font-semibold tracking-widest text-[#72d3f1] uppercase">
            Operational Intelligence
          </span>
          <h2 className="text-3xl leading-tight font-bold text-white xl:text-4xl">
            Quản trị kho bãi
            <br />
            thế hệ mới
          </h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Nền tảng vận hành tập trung giúp kiểm soát tồn kho, vận chuyển và nhân sự trong một giao
            diện thống nhất.
          </p>
        </div>

        {/* Trust points */}
        <footer className="mt-auto">
          <Separator className="mb-8 bg-white/10" />
          <ul className="space-y-4">
            {trustPoints.map((point) => (
              <li key={point.label} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 size-4 flex-shrink-0 text-[#72d3f1]"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-white">{point.label}</p>
                  <p className="text-xs leading-relaxed text-white/50">{point.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  )
}
