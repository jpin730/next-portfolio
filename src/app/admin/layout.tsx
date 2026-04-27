import Link from 'next/link'
import { redirect } from 'next/navigation'
import { JSX } from 'react'

import { ProtectedPageRestoreGuard } from '@/core/components/ProtectedPageRestoreGuard'
import { Route } from '@/core/consts/Route'
import { auth } from '@/core/lib/auth'

interface Props {
  children: React.ReactNode
}

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: Readonly<Props>): Promise<JSX.Element> {
  const session = await auth.getSession()

  if (!session) {
    redirect(Route.AUTH_LOGIN)
  }

  return (
    <>
      <ProtectedPageRestoreGuard />

      <div className="min-h-dvh bg-black text-white">
        <header className="border-b border-gray-400/20 bg-black/95">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link className="text-sm tracking-widest text-gray-400 uppercase" href={Route.ADMIN}>
              dashboard
            </Link>
            <a
              href={Route.AUTH_LOGOUT}
              className="border border-white px-3 py-2 text-sm text-white transition hover:bg-white hover:text-black"
            >
              Logout
            </a>
          </nav>
        </header>
        {children}
      </div>
    </>
  )
}
