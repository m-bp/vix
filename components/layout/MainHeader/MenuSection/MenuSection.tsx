import chev from "@material-design-icons/svg/filled/expand_more.svg"
import MenuDropdown from "components/layout/MainHeader/MenuDropdown"
import { getHref } from "lib/helpers"
import { Settings } from "lib/sanity.queries"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
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
      <div ref={wrapperRef} className={s.wrapper}>
        <div onClick={() => setOpen(true)} className={s.dropdownWrapper}>
          <span style={{ fontWeight: "bold" }}>{title}</span>
          <Image
            alt=""
            width={16}
            height={16}
            src={chev}
            style={{
              filter:
                "invert(66%) sepia(8%) saturate(358%) hue-rotate(193deg) brightness(82%) contrast(83%)",
            }}
          />
          {open && <MenuDropdown forwardRef={ref} dropdown={dropdown} />}
        </div>
      </div>
    )

  return (
    <div className={s.wrapper}>
      <a href={getHref(url, locale)} style={{ fontWeight: "bold" }}>
        {title}
      </a>
    </div>
  )
}

export default MenuSection
export type { Props as MenuSectionProps }
