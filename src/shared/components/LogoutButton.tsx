'use client'

import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import { Button } from './Button'

export function LogoutButton(): JSX.Element {
  const handleLogout = (): void => {
    window.location.replace(Route.AUTH_LOGOUT)
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  )
}
