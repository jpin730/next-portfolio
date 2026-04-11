import { ROUTES } from '../consts/routes'

const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.CERTIFICATES, ROUTES.AUTH]

export const isPublicRoute = (pathname: string): boolean =>
  PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
