import clsx from "clsx"
import { HTMLProps, ReactNode } from "react"

import s from "./Button.module.scss"

type Props = {
  children: ReactNode
  className?: string
  variant?: "primary" | "primary-light" | "secondary" | "tertiary" | "link"
  withShadow?: boolean
  as?: "a"
  fullWidth?: boolean
} & HTMLProps<"button">

function Button({
  children,
  className,
  withShadow,
  as,
  fullWidth,
  variant = "primary",
  ...rest
}: Props) {
  const Tag = as ?? "button"

  return (
    <Tag
      className={clsx(
        s[variant],
        fullWidth && s.fullWidth,
        withShadow && s.withShadow,
        className
      )}
      {...rest}>
      {children}
    </Tag>
  )
}

export default Button
export type { Props as ButtonProps }
