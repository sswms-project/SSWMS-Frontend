'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Building2, Check, Rocket, TrendingUp, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_ROUTES } from '@/routes/app-routes'

type BillingCycle = 'monthly' | 'yearly'

const ANNUAL_DISCOUNT_PERCENT = 20

type PricingPlan = {
  icon: LucideIcon
  name: string
  monthlyPrice: number | null
  priceLabel?: string
  priceNote: string
  description: string
  features: string[]
  callToAction: string
  highlighted?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    icon: Rocket,
    name: 'Khởi nghiệp',
    monthlyPrice: 0,
    priceNote: 'không giới hạn thời gian',
    description: 'Cho đội nhỏ bắt đầu số hóa kho.',
    features: [
      '1 kho, tối đa 500 SKU',
      '3 tài khoản thành viên',
      'Quản lý tồn kho & xuất nhập cơ bản',
      'Báo cáo tuần qua email',
    ],
    callToAction: 'Tạo tài khoản',
  },
  {
    icon: TrendingUp,
    name: 'Tăng trưởng',
    monthlyPrice: 1990000,
    priceNote: 'mỗi kho / tháng',
    description: 'Cho doanh nghiệp vận hành nhiều kho.',
    features: [
      'Không giới hạn SKU và thành viên',
      'Bảng điều khiển thời gian thực',
      'AI dự báo nhu cầu nhập hàng',
      'Điều phối vận chuyển & phân ca',
      'Hỗ trợ ưu tiên trong giờ hành chính',
    ],
    callToAction: 'Dùng thử 14 ngày',
    highlighted: true,
  },
  {
    icon: Building2,
    name: 'Doanh nghiệp',
    monthlyPrice: null,
    priceLabel: 'Liên hệ',
    priceNote: 'báo giá theo quy mô',
    description: 'Cho chuỗi kho cần tùy chỉnh sâu.',
    features: [
      'Tất cả tính năng gói Tăng trưởng',
      'SLA 99,95% có cam kết hợp đồng',
      'SSO / SAML và phân quyền nâng cao',
      'Tích hợp ERP, TMS qua API riêng',
      'Quản lý khách hàng chuyên trách',
    ],
    callToAction: 'Liên hệ kinh doanh',
  },
]

function formatVnd(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + '₫'
}

function getEffectiveMonthlyPrice(monthlyPrice: number, billingCycle: BillingCycle) {
  return billingCycle === 'yearly'
    ? Math.round((monthlyPrice * (100 - ANNUAL_DISCOUNT_PERCENT)) / 100)
    : monthlyPrice
}

function toggleButtonClass(isActive: boolean) {
  return isActive
    ? 'bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-semibold transition-colors'
    : 'text-muted-foreground hover:text-foreground rounded-full px-4 py-1.5 text-sm font-semibold transition-colors'
}

function PriceDisplay({ plan, billingCycle }: { plan: PricingPlan; billingCycle: BillingCycle }) {
  if (plan.monthlyPrice === null) {
    return <span className="text-3xl font-bold tracking-tight">{plan.priceLabel}</span>
  }
  if (plan.monthlyPrice === 0) {
    return <span className="text-3xl font-bold tracking-tight">Miễn phí</span>
  }

  const effectiveMonthly = getEffectiveMonthlyPrice(plan.monthlyPrice, billingCycle)

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={billingCycle}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="text-3xl font-bold tracking-tight tabular-nums"
      >
        {formatVnd(effectiveMonthly)}
      </motion.span>
    </AnimatePresence>
  )
}

export function PricingSection() {
  const prefersReducedMotion = useReducedMotion()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  return (
    <section
      id="pricing"
      className="border-border/60 bg-surface-container-low/60 scroll-mt-14 border-y"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto w-full max-w-(--container-landing) px-4 py-16 md:px-6 lg:py-24">
        <div className="mb-8 max-w-2xl">
          <p className="text-primary text-xs font-semibold tracking-[0.12em] uppercase">
            Bảng giá minh bạch
          </p>
          <h2 id="pricing-heading" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            Trả đúng theo quy mô kho của bạn
          </h2>
        </div>

        {/* Billing cycle toggle */}
        <div
          className="border-border bg-card mb-10 inline-flex max-w-full flex-wrap items-center gap-1 rounded-full border p-1"
          role="group"
          aria-label="Chọn chu kỳ thanh toán"
        >
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            aria-pressed={billingCycle === 'monthly'}
            className={toggleButtonClass(billingCycle === 'monthly')}
          >
            Theo tháng
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            aria-pressed={billingCycle === 'yearly'}
            className={toggleButtonClass(billingCycle === 'yearly')}
          >
            Theo năm
          </button>
          <Badge className="bg-primary-container text-on-primary-container mx-1 max-w-full border-transparent">
            Tiết kiệm {ANNUAL_DISCOUNT_PERCENT}%
          </Badge>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const PlanIcon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: 'easeOut' }}
                className="relative h-full"
              >
                {plan.highlighted && (
                  <Badge className="bg-primary text-primary-foreground absolute -top-3 left-1/2 z-10 -translate-x-1/2 border-transparent">
                    Phổ biến nhất
                  </Badge>
                )}
                <Card
                  className={
                    plan.highlighted
                      ? 'border-primary bg-card h-full border-2 shadow-lg lg:scale-[1.04]'
                      : 'border-border/70 h-full'
                  }
                >
                  <CardHeader>
                    <div
                      className={
                        plan.highlighted
                          ? 'bg-primary text-primary-foreground mb-2 flex size-9 items-center justify-center rounded-lg'
                          : 'bg-muted text-muted-foreground mb-2 flex size-9 items-center justify-center rounded-lg'
                      }
                    >
                      <PlanIcon className="size-4.5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <p className="mt-3 flex flex-wrap items-baseline gap-2">
                      <PriceDisplay plan={plan} billingCycle={billingCycle} />
                      <span className="text-muted-foreground text-xs">{plan.priceNote}</span>
                    </p>
                    {plan.highlighted && billingCycle === 'yearly' && plan.monthlyPrice && (
                      <p className="text-muted-foreground mt-1 text-xs">
                        Thanh toán{' '}
                        {formatVnd(getEffectiveMonthlyPrice(plan.monthlyPrice, 'yearly') * 12)} /
                        năm
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <Check
                            className="text-primary mt-0.5 size-4 shrink-0"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-full"
                      variant={plan.highlighted ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={APP_ROUTES.auth.register}>{plan.callToAction}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <p className="text-muted-foreground mt-8 text-center text-xs">
          Giá chưa gồm VAT. Hủy bất kỳ lúc nào — dữ liệu kho của bạn luôn có thể xuất ra đầy đủ.
        </p>
      </div>
    </section>
  )
}
