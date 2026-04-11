import 'server-only'

import { Auth0Client } from '@auth0/nextjs-auth0/server'
import type { SessionData, User } from '@auth0/nextjs-auth0/types'
import type { NextRequest, NextResponse } from 'next/server'

import type { AuthSession, AuthUser } from '@/core/auth/types/auth'

interface AuthProvider {
  middleware(request: NextRequest): Promise<NextResponse>
  getSession(): Promise<AuthSession | null>
  getRequestSession(request: NextRequest): Promise<AuthSession | null>
  isAuthenticated(): Promise<boolean>
  isRequestAuthenticated(request: NextRequest): Promise<boolean>
}

const auth0Client = new Auth0Client()

const mapAuth0UserToAuthUser = (user: User): AuthUser => {
  const { sub, email, name, picture, ...claims } = user

  return {
    id: sub,
    email: email ?? null,
    name: name ?? null,
    picture: picture ?? null,
    claims,
  }
}

const mapAuth0SessionToAuthSession = (session: SessionData | null): AuthSession | null => {
  if (!session) {
    return null
  }

  return {
    user: mapAuth0UserToAuthUser(session.user),
  }
}

export const auth: AuthProvider = {
  middleware(request) {
    return auth0Client.middleware(request)
  },
  async getSession() {
    const session = await auth0Client.getSession()

    return mapAuth0SessionToAuthSession(session)
  },
  async getRequestSession(request) {
    const session = await auth0Client.getSession(request)

    return mapAuth0SessionToAuthSession(session)
  },
  async isAuthenticated() {
    const session = await this.getSession()

    return Boolean(session)
  },
  async isRequestAuthenticated(request) {
    const session = await this.getRequestSession(request)

    return Boolean(session)
  },
}
