import { InputHTMLAttributes, JSX, Ref } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref?: Ref<HTMLInputElement>
}

export function Input({ className = '', ref, ...props }: Readonly<Props>): JSX.Element {
  const baseStyles =
    'w-full border border-gray-400/20 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 transition focus:border-white focus:ring-1 focus:ring-white focus:outline-none'

  return <input ref={ref} className={`${baseStyles} ${className}`.trim()} {...props} />
}
