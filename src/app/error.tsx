'use client'

import { JSX } from 'react'

import { StatusPage } from '@/shared/components/StatusPage'

interface Props {
  error: Error
}

export default function Error({ error }: Readonly<Props>): JSX.Element {
  return <StatusPage code="500" title="Internal Server Error" description={error.message ?? null} />
}
