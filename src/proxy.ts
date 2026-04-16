import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'

import { ROUTES } from '@/core/consts/routes'
import { auth } from '@/core/lib/auth'
import { isPublicRoute } from '@/core/utils/isPublicRoute'

export async function proxy(request: NextRequest): Promise<NextResponse<unknown>> {
  const response = await auth.middleware(request)

  const { pathname } = request.nextUrl

  if (isPublicRoute(pathname)) {
    return response
  }

  const isAuthenticated = await auth.isRequestAuthenticated(request)

  if (isAuthenticated) {
    return response
  }

  const loginUrl = new URL(ROUTES.AUTH_LOGIN, request.nextUrl.origin)
  loginUrl.searchParams.set('returnTo', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config: ProxyConfig = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
}
