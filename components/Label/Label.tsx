import { ReactNode } from "react"

import s from "./Label.module.scss"

type Props = {
  children: ReactNode
  component?: "h1" | "span" | "p"
}

function Label({ children, component: Component = "span" }: Props) {
  return <Component className={s.wrapper}>{children}</Component>
}

export default Label
export type { Props as LabelProps }
