import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'

import { Route } from '@/core/consts/Route'
import * as auth from '@/core/lib/auth'

export async function proxy(request: NextRequest): Promise<NextResponse<unknown>> {
  const response = await auth.middleware(request)

  const { pathname } = request.nextUrl

  if (![Route.ADMIN, Route.AUTH_LOGIN].some((route) => pathname.startsWith(route))) {
    return response
  }

  const session = await auth.getRequestSession(request)
  const isLoginRoute = pathname.startsWith(Route.AUTH_LOGIN)

  if (!session && !isLoginRoute) {
    const loginUrl = new URL(Route.AUTH_LOGIN, request.nextUrl.origin)
    loginUrl.searchParams.set('returnTo', Route.ADMIN)
    return NextResponse.redirect(loginUrl)
  }

  if (session && isLoginRoute) {
    const adminUrl = new URL(Route.ADMIN, request.nextUrl.origin)
    return NextResponse.redirect(adminUrl)
  }

  return response
}

export const config: ProxyConfig = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
}
