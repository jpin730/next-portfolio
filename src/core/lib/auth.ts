import 'server-only'

import { Auth0Client } from '@auth0/nextjs-auth0/server'
import type { NextRequest, NextResponse } from 'next/server'

import { getEnvironment } from '@/core/lib/env'

interface AuthUser {
  id: string
  email: string | null
  name: string | null
  picture: string | null
  claims: Record<string, unknown>
}

interface AuthSession {
  user: AuthUser
}

const environment = getEnvironment()

const auth0Client = new Auth0Client({
  appBaseUrl: environment.APP_BASE_URL,
  clientId: environment.AUTH0_CLIENT_ID,
  clientSecret: environment.AUTH0_CLIENT_SECRET,
  domain: environment.AUTH0_DOMAIN,
  secret: environment.AUTH0_SECRET,
})

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
  return auth0Client.middleware(request)
}

export const getRequestSession = async (request: NextRequest): Promise<AuthSession | null> => {
  const session = await auth0Client.getSession(request)
  if (!session) {
    return null
  }

  const { sub, email, name, picture, ...claims } = session.user
  return {
    user: {
      id: sub,
      email: email ?? null,
      name: name ?? null,
      picture: picture ?? null,
      claims,
    },
  }
}
