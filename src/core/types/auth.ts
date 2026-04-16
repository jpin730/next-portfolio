export interface AuthUser {
  id: string
  email: string | null
  name: string | null
  picture: string | null
  claims: Record<string, unknown>
}

export interface AuthSession {
  user: AuthUser
}
