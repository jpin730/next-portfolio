export const Route = {
  HOME: '/',
  CERTIFICATES: '/certificates',

  // Admin
  ADMIN: '/admin',
  ADMIN_CERTIFICATES: '/admin/certificates',
  ADMIN_CERTIFICATE_ISSUERS: '/admin/certificate-issuers',
  ADMIN_CERTIFICATE_CATEGORIES: '/admin/certificate-categories',

  // Authentication
  AUTH: '/auth',
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
} as const

export type Route = (typeof Route)[keyof typeof Route]
