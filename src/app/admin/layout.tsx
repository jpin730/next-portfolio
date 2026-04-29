import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import { Link } from '@/shared/components/Link'
import { LogoutButton } from '@/shared/components/LogoutButton'
import { ProtectedPageRestoreGuard } from '@/shared/components/ProtectedPageRestoreGuard'

interface Props {
  children: React.ReactNode
}

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: Readonly<Props>): Promise<JSX.Element> {
  return (
    <>
      <ProtectedPageRestoreGuard />

      <div className="min-h-dvh bg-black text-white">
        <header className="border-b border-gray-400/20 bg-black/95">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link variant="ghost" className="tracking-widest uppercase" href={Route.ADMIN}>
              dashboard
            </Link>
            <LogoutButton />
          </nav>
        </header>
        {children}
      </div>
    </>
  )
}
