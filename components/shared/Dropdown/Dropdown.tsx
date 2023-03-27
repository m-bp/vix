import "react-slidedown/lib/slidedown.css"

import clsx from "clsx"
import { type ReactNode, useState } from "react"
import SlideDown from "react-slidedown"

import s from "./Dropdown.module.scss"

type Props = {
  children: ReactNode
  trigger: ReactNode
  wrapperClass?: string
  openClass?: string
}

function Dropdown({ children, trigger, wrapperClass, openClass }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={clsx(
        s.wrapper,
        wrapperClass,
        open && s.open,
        open && openClass
      )}>
      <button className={s.trigger} onClick={() => setOpen(open => !open)}>
        {trigger}
      </button>
      <div className={s.dropdown}>
        <SlideDown closed={!open}>{children}</SlideDown>
      </div>
    </div>
  )
}

export default Dropdown
export type { Props as DropdownProps }
