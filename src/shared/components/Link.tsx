import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { AnchorHTMLAttributes, JSX, Ref } from 'react'

import { ButtonVariant, buttonVariants } from './Button'

interface Props
  extends NextLinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: ButtonVariant | 'none'
  native?: boolean
  ref?: Ref<HTMLAnchorElement>
}

export function Link({
  className = '',
  variant = 'none',
  native = false,
  ref,
  ...props
}: Readonly<Props>): JSX.Element {
  const finalClassName = variant === 'none' ? className : buttonVariants(variant, className)

  if (native) {
    const { href, ...anchorProps } = props
    return <a ref={ref} href={href as string} className={finalClassName} {...anchorProps} />
  }

  return <NextLink ref={ref} className={finalClassName} {...props} />
}
