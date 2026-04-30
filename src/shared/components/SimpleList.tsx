import { JSX } from 'react'

import { Link } from './Link'

export interface SimpleListItem {
  id: string | number
  name: string
  href?: string
}

export interface Props {
  items: readonly SimpleListItem[]
  headerLabel?: string
}

export function SimpleList({ items, headerLabel = 'Name' }: Readonly<Props>): JSX.Element | null {
  if (items.length === 0) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-dashed border-gray-400/20 bg-white/5 px-4 py-10 text-center text-sm text-gray-400"
      >
        No items found.
      </div>
    )
  }

  return (
    <section className="overflow-hidden border border-gray-400/20 bg-white/5">
      <header className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 border-b border-gray-400/20 px-4 py-3 text-xs tracking-[0.3em] text-gray-400 uppercase sm:px-6">
        <span aria-hidden="true">#</span>
        <span>{headerLabel}</span>
      </header>

      <ul className="divide-y divide-gray-400/20">
        {items.map((item, index) => {
          const content = (
            <>
              <span className="text-sm text-gray-500" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-white sm:text-base">{item.name}</span>
            </>
          )

          const rowClasses =
            'grid grid-cols-[96px_minmax(0,1fr)] gap-4 px-4 py-4 transition hover:bg-white/5 sm:px-6'

          if (item.href) {
            return (
              <li key={item.id}>
                <Link href={item.href} variant="none" className={`block ${rowClasses}`}>
                  {content}
                </Link>
              </li>
            )
          }

          return (
            <li key={item.id} className={rowClasses}>
              {content}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
