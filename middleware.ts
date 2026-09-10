import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/definitions'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // IMPORTANT: session presence is judged by the long-lived refreshToken,
  // not the 15-min accessToken — otherwise every user gets bounced to
  // /login the moment the access token naturally expires, even though
  // fetchWithAuth() would have silently refreshed it.
  const hasSession = Boolean(request.cookies.get('refreshToken')?.value)

  const isProtectedRoute = PROTECTED_ROUTES.some((route: string) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = AUTH_ROUTES.some((route: string) =>
    pathname.startsWith(route)
  )

  // 1. No session on a protected route -> /login
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Already logged in and hitting /login or /register -> /dashboard
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // No role-based redirect here anymore — there's one shared /dashboard for
  // every role. Role-specific gating (e.g. /dashboard/users being admin-only)
  // happens in that page itself via requireRole(), not in middleware.
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}