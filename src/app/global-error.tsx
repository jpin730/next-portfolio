'use client'

import Link from 'next/link'
import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import { StatusPage } from '@/shared/components/StatusPage'

interface Props {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function GlobalError({ unstable_retry }: Readonly<Props>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Internal Server Error</title>
      </head>
      <body>
        <StatusPage
          code="500"
          title="Internal Server Error"
          description="An unexpected application error occurred. Please retry or return to the home page."
          action={
            <>
              <button
                className="border border-white px-4 py-2 text-sm text-white transition hover:bg-white hover:text-black"
                onClick={() => unstable_retry()}
                type="button"
              >
                Try again
              </button>
              <Link
                className="border border-gray-400/30 px-4 py-2 text-sm text-gray-300 transition hover:border-white hover:text-white"
                href={Route.HOME}
              >
                Go home
              </Link>
            </>
          }
        />
      </body>
    </html>
  )
}
