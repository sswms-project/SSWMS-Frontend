'use client'

import { motion } from 'framer-motion'
import { Warehouse } from 'lucide-react'
import Link from 'next/link'
import { APP_ROUTES } from '@/routes/app-routes'

const warehouseVisualUrl = 'https://picsum.photos/seed/warehouse-industrial/800/1200'

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
    <div className="relative flex h-full flex-col overflow-hidden bg-[#002b38]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12] grayscale"
        style={{ backgroundImage: `url(${warehouseVisualUrl})` }}
        role="img"
        aria-label="Kho hàng tự động hiện đại"
      />
      {/* Subtle radial ambient light — top */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(114,211,241,0.08),transparent)]" />
      {/* Bottom fade */}
      <div className="absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t from-[#002b38] to-transparent" />

      <div className="relative flex h-full flex-col p-8 xl:p-12">
        {/* Logo */}
        <Link
          href={APP_ROUTES.auth.login}
          className="flex items-center gap-2.5 text-white/90"
          aria-label="SSWMS"
        >
          <Warehouse className="size-5" aria-hidden="true" />
          <span className="text-base font-bold tracking-tight">SSWMS</span>
        </Link>

        {/* Hero text */}
        <div className="flex flex-1 flex-col justify-center">
          <span className="mb-5 text-[11px] font-semibold tracking-[0.12em] text-[#72d3f1]/70 uppercase">
            Operational Intelligence
          </span>
          <h2 className="text-3xl leading-[1.2] font-semibold tracking-tight text-white xl:text-[2.6rem]">
            Quản trị kho bãi
            <br />
            <span className="text-white/60">thế hệ mới</span>
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/40">
            Nền tảng vận hành tập trung giúp kiểm soát tồn kho, vận chuyển và nhân sự trong một giao
            diện thống nhất.
          </p>
        </div>

        {/* Trust points */}
        <footer className="mt-auto">
          <div className="mb-7 h-px bg-white/[0.08]" />
          <ul className="space-y-5">
            {trustPoints.map((point, i) => (
              <motion.li
                key={point.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
              >
                <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#72d3f1]/60" />
                <div>
                  <p className="text-sm font-medium text-white/80">{point.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/35">{point.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  )
}
