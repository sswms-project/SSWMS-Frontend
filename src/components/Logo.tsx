import type { Route } from 'next'
import { Boxes } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { APP_ROUTES } from '@/routes/app-routes'

type LogoSize = 'sm' | 'default' | 'lg'
type LogoTone = 'default' | 'inverse'

interface LogoProps {
  /** Pass `null` to render a non-interactive brand mark instead of a link. */
  href?: string | null
  size?: LogoSize
  tone?: LogoTone
  className?: string
}

const markSizeClasses: Record<LogoSize, string> = {
  sm: 'size-6',
  default: 'size-8',
  lg: 'size-10',
}

const iconSizeClasses: Record<LogoSize, string> = {
  sm: 'size-3',
  default: 'size-4',
  lg: 'size-5',
}

const textSizeClasses: Record<LogoSize, string> = {
  sm: 'text-base',
  default: 'text-lg',
  lg: 'text-2xl',
}

export function Logo({
  href = APP_ROUTES.home,
  size = 'default',
  tone = 'default',
  className,
}: LogoProps) {
  const content = (
    <>
      <span
        className={cn(
          'from-primary to-primary-container flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br',
          markSizeClasses[size]
        )}
        aria-hidden="true"
      >
        <Boxes className={cn('text-on-primary', iconSizeClasses[size])} aria-hidden="true" />
      </span>
      <span
        className={cn(
          'font-logo tracking-tight',
          textSizeClasses[size],
          tone === 'inverse' ? 'text-inverse-on-surface' : 'text-foreground'
        )}
      >
        K<span className={tone === 'inverse' ? 'text-primary-container' : 'text-primary'}>O</span>
        VIA
      </span>
    </>
  )
  const wrapperClassName = cn('inline-flex items-center gap-2', className)

  if (href === null) {
    return (
      <span className={wrapperClassName} aria-label="KOVIA">
        {content}
      </span>
    )
  }

  return (
    <Link href={href as Route} className={wrapperClassName} aria-label="KOVIA - Trang chủ">
      {content}
    </Link>
  )
}
