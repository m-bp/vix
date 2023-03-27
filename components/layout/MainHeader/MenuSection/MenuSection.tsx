import MenuDropdown from "components/layout/MainHeader/MenuDropdown/MenuDropdown"
import ChevronDown from "components/shared/icons/ChevronDown"
import { getHref } from "lib/helpers"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { Settings } from "sanity"
import { useOnClickOutside } from "usehooks-ts"

import s from "./MenuSection.module.scss"

type Props = Settings["headerLinks"][0]

function MenuSection({ dropdown, title, url, hasDropdown, ...rest }: Props) {
  const { locale } = useRouter()

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>()
  const ref = useRef<HTMLDivElement>()
  useOnClickOutside(ref, e => {
    // if (!ref.current.contains(e.target)) setOpen(false)
    setOpen(false)
  })

  if (hasDropdown)
    return (
      <div style={{ position: "relative" }} ref={wrapperRef}>
        <div onClick={() => setOpen(true)} className={s.dropdownWrapper}>
          <span style={{ fontWeight: "bold" }}>{title}</span>
          <ChevronDown />
          {open && <MenuDropdown forwardRef={ref} dropdown={dropdown} />}
        </div>
      </div>
    )

  return (
    <div>
      <a href={getHref(url, locale)} style={{ fontWeight: "bold" }}>
        {title}
      </a>
    </div>
  )
}

export default MenuSection
export type { Props as MenuDropdownProps }
