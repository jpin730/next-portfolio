import { Route } from '../consts/Route'

const PUBLIC_ROUTES = [Route.HOME, Route.CERTIFICATES, Route.AUTH]

export const isPublicRoute = (pathname: string): boolean =>
  PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
