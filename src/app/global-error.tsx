'use client'

import { JSX } from 'react'

import { StatusPage } from '@/shared/components/StatusPage'

interface Props {
  error: Error
}

export default function GlobalError({ error }: Readonly<Props>): JSX.Element {
  return (
    <html lang="en">
      <head>
        <title>Global Error</title>
      </head>
      <body>
        <StatusPage code="500" title="Global Error" description={error.message ?? null} />
      </body>
    </html>
  )
}
