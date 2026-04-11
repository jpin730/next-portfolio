import { auth0 } from '@/auth/lib/auth0'

export default async function Page() {
  const session = await auth0.getSession()

  if (!session) {
    return <a href="/auth/login">Login</a>
  }

  return (
    <main>
      <h1>Admin</h1>

      <p>Logged in as {session.user.email}</p>

      {/* Display user info (name, email, etc.) */}
      <h1>User Profile</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      {/* Ends the session and redirects to Auth0 to log out */}
      <a href="/auth/logout">Logout</a>
    </main>
  )
}
