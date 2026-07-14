import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { APP_ROUTES } from '@/routes/app-routes'

const PUBLIC_PATHS = [
  APP_ROUTES.auth.login,
  APP_ROUTES.auth.register,
  APP_ROUTES.auth.verifyEmail,
  APP_ROUTES.auth.forgotPassword,
  APP_ROUTES.auth.resetPassword,
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  const isPublic = pathname === APP_ROUTES.home || PUBLIC_PATHS.some((p) => pathname.startsWith(p))

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL(APP_ROUTES.auth.login, request.url))
  }

  if (pathname === APP_ROUTES.auth.login && token) {
    return NextResponse.redirect(new URL(APP_ROUTES.dashboard, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
