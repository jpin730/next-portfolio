import { JSX } from 'react'

import { StatusPage } from '@/shared/components/StatusPage'

export default function NotFound(): JSX.Element {
  return <StatusPage code="404" title="Page Not Found" />
}
