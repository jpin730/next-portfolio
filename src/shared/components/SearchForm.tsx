import Form from 'next/form'
import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import { Button } from './Button'
import { Input } from './Input'

export interface Props {
  action: Route
  defaultValue?: string
  placeholder?: string
}

export function SearchForm({
  action,
  defaultValue = '',
  placeholder = 'Search...',
}: Readonly<Props>): JSX.Element {
  return (
    <Form action={action} className="mt-4 flex items-center gap-2">
      <Input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="max-w-md"
      />
      <Button type="submit" variant="secondary">
        Search
      </Button>
    </Form>
  )
}
