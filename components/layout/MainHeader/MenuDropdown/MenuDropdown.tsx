import { getHref } from "lib/helpers"
import { Settings } from "lib/sanity.queries"
import { useRouter } from "next/router"
import { RefObject } from "react"

import MenuColumn from "../MenuColumn/MenuColumn"
import s from "./MenuDropdown.module.scss"

type Props = {
  forwardRef: RefObject<HTMLDivElement>
  dropdown: Settings["headerLinks"][0]["dropdown"]
}

function MenuDropdown({ forwardRef, dropdown }: Props) {
  const { locale } = useRouter()

  return (
    <div
      className={s.wrapper}
      ref={forwardRef}
      style={{ "--offset": `${dropdown.offset}px` }}>
      <div className={s.columnGrid}>
        {dropdown.columns.map((x, i) => (
          <MenuColumn key={i} {...x} />
        ))}
      </div>

      {dropdown.bottomLink?.length > 0 && (
        <a
          href={getHref(dropdown.bottomLink[0], locale)}
          className={s.bottomLink}>
          {dropdown.bottomLink[0].text}
        </a>
      )}
    </div>
  )
}

export default MenuDropdown
export type { Props as MenuDropdownProps }
