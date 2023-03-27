import clsx from "clsx"
import { ReactNode } from "react"

import s from "./Button.module.scss"

type Props = {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "tertiary" | "link"
  withShadow?: boolean
  as?: "a"
}

function Button({
  children,
  className,
  withShadow,
  as,
  variant = "primary",
  ...rest
}: Props) {
  const Tag = as === "a" ? "a" : "button"
  return (
    <Tag
      className={clsx(s[variant], withShadow && s.withShadow, className)}
      {...rest}>
      {children}
    </Tag>
  )
}

export default Button
export type { Props as ButtonProps }
