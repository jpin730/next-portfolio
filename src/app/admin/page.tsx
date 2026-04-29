import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import { Link } from '@/shared/components/Link'

export const dynamic = 'force-dynamic'

interface AdminTile {
  title: string
  href: Route
}

export default function Page(): JSX.Element {
  const tiles: AdminTile[] = [
    {
      title: 'Certificates',
      href: Route.ADMIN_CERTIFICATES,
    },
    {
      title: 'Certificate issuers',
      href: Route.ADMIN_CERTIFICATE_ISSUERS,
    },
    {
      title: 'Certificate categories',
      href: Route.ADMIN_CERTIFICATE_CATEGORIES,
    },
  ]

  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="mt-4 text-3xl font-medium sm:text-4xl">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tiles.map((tile) => (
            <Link
              className="group min-h-40 border border-gray-400/20 bg-white/5 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:min-h-62.5"
              href={tile.href}
              key={tile.title}
            >
              <h2 className="text-2xl font-medium tracking-tight text-white transition group-hover:text-gray-100 sm:text-3xl">
                {tile.title}
              </h2>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
