import { JSX } from 'react'

import { Route } from '@/core/consts/Route'
import * as certificateCategoryService from '@/features/admin-certificates/lib/certificateCategoryService'
import { SearchForm } from '@/shared/components/SearchForm'
import { SimpleList } from '@/shared/components/SimpleList'

export const dynamic = 'force-dynamic'

export interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function Page({ searchParams }: Readonly<PageProps>): Promise<JSX.Element> {
  const { q } = await searchParams
  const query = q || ''

  const certificateCategories = await certificateCategoryService.getAll(query)

  const listItems = certificateCategories.map((category) => ({
    id: category.id,
    name: category.name,
    href: `${Route.ADMIN_CERTIFICATE_CATEGORIES}/${category.id}`,
  }))

  return (
    <main>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Certificate categories
          </h1>

          <SearchForm
            action={Route.ADMIN_CERTIFICATE_CATEGORIES}
            defaultValue={query}
            placeholder="Search categories..."
          />
        </div>

        <SimpleList items={listItems} />
      </section>
    </main>
  )
}
