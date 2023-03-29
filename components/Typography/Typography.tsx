import clsx from "clsx"
import { HTMLProps, ReactNode } from "react"

import s from "./Typography.module.scss"

type Variant = "normal" | "small"

type Props = {
  variant?: Variant
  component?: keyof HTMLElementTagNameMap
  className?: string
  children: ReactNode
} & HTMLProps<any>

const componentMap: Record<Variant, keyof HTMLElementTagNameMap> = {
  normal: "p",
  small: "p",
}

function Typography({
  variant = "normal",
  component,
  className,
  children,
}: Props) {
  const Tag = component || componentMap[variant]

  return <Tag className={clsx(s[variant], className)}>{children}</Tag>
}

export default Typography
export type { Props as HeadingProps }
