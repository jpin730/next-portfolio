import type { NextRequest, ProxyConfig } from 'next/server'
import { NextResponse } from 'next/server'

import { Route } from '@/core/consts/Route'
import { auth } from '@/core/lib/auth'

export async function proxy(request: NextRequest): Promise<NextResponse<unknown>> {
  const response = await auth.middleware(request)

  const { pathname } = request.nextUrl

  if (!pathname.startsWith(Route.ADMIN)) {
    return response
  }

  const session = await auth.getRequestSession(request)

  if (session) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    return response
  }

  const loginUrl = new URL(Route.AUTH_LOGIN, request.nextUrl.origin)
  loginUrl.searchParams.set('returnTo', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config: ProxyConfig = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|sitemap.xml|robots.txt).*)'],
}
