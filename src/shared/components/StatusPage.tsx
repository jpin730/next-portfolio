import { JSX } from 'react'

interface Props {
  code: string
  title: string
  description?: string | null
}

export function StatusPage({ code, title, description = null }: Readonly<Props>): JSX.Element {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <p className="text-4xl font-bold sm:text-5xl">{code}</p>
          <span className="block h-16 w-0.5 bg-gray-400"></span>
          <h1 className="text-2xl sm:text-3xl">{title}</h1>
        </div>

        {description && (
          <p className="max-w-xl text-sm text-gray-400 sm:text-base">{description}</p>
        )}
      </div>
    </main>
  )
}
