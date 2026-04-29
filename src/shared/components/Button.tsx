import { ButtonHTMLAttributes, JSX, Ref } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant
  ref?: Ref<HTMLButtonElement>
}

export function buttonVariants(variant: ButtonVariant, className = ''): string {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants: Record<ButtonVariant, string> = {
    primary: 'border border-gray-400/20 bg-white text-black hover:bg-gray-200',
    secondary: 'border border-gray-400/20 bg-white/10 text-white hover:bg-white/20',
    outline: 'border border-white bg-transparent text-white hover:bg-white hover:text-black',
    danger: 'border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20',
    ghost: 'border border-transparent bg-transparent text-gray-400 hover:text-white',
  }

  return `${baseStyles} ${variants[variant]} ${className}`.trim()
}

export function Button({ className = '', variant, ref, ...props }: Readonly<Props>): JSX.Element {
  return <button ref={ref} className={buttonVariants(variant, className)} {...props} />
}
