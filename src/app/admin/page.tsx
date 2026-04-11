import { SessionData } from '@auth0/nextjs-auth0/types'

import { auth0 } from '@/core/auth/lib/auth0'
import { ROUTES } from '@/core/routing/consts/routes'

export default async function Page() {
  const session = (await auth0.getSession()) as SessionData

  return (
    <main>
      <h1>Admin</h1>

      <p>Logged in as {session.user.email}</p>

      <p>User Profile</p>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <a href={ROUTES.AUTH_LOGOUT}>Logout</a>
    </main>
  )
}
