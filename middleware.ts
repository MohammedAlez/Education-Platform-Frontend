import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/lib/definitions'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for the presence of your access token or session cookie
  const accessToken = request.cookies.get('accessToken')?.value

  const isProtectedRoute = PROTECTED_ROUTES.some((route:string) => pathname.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some((route:string) => pathname.startsWith(route))

  // 1. If trying to access protected route without token -> Redirect to /login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname) // Return URL after login
    return NextResponse.redirect(loginUrl)
  }

  // 2. If logged in and trying to access auth routes (/login, /register) -> Redirect to /dashboard
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Ensure middleware runs only on relevant routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}