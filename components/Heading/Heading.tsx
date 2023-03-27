import clsx from "clsx"
import { ReactNode } from "react"

import s from "./Heading.module.scss"

type Level = 1 | 2 | 3 | 4 | 5 | 6 | "1" | "2" | "3" | "4" | "5" | "6"

type Props = {
  variant: Level
  component?: Level
  className?: string
  children: ReactNode
}

function Heading({ variant, component = variant, className, children }: Props) {
  const Tag = `h${component}` as const
  const variantClass = `h${variant}` as const

  return <Tag className={clsx(s[variantClass], className)}>{children}</Tag>
}

export default Heading
export type { Props as HeadingProps }
