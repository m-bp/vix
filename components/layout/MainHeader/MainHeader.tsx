import clsx from "clsx"
import Logo from "components/shared/Logo/Logo"
import { useSettings } from "context/SettingsContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ScrollEventHandler } from "sanity"
import { s as schema } from "sanity-typed-schema-builder"
import { customUrlType } from "schemas"
import { useElementSize } from "usehooks-ts"

import s from "./MainHeader.module.scss"
import MenuSection from "./MenuSection/MenuSection"

const useOldFloating = () => {
  const [floating, setFloating] = useState(false)

  const [ref, { height }] = useElementSize()

  useEffect(() => {
    if (typeof window === "undefined") return null

    const triggerHeight = height + 0

    const onScroll: ScrollEventHandler = event => {
      const scrollTop = window.scrollY

      if (!floating && scrollTop > triggerHeight) {
        setFloating(true)
      } else if (floating && scrollTop <= 0) {
        setFloating(false)
      }
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [floating, height])

  // useEffect(() => {
  //   if (floating) document.body.style.marginTop = `${height}px`
  //   else document.body.style.marginTop = null
  // }, [floating, height])

  return [floating, ref, height]
}

const useFloating = () => {
  const [floating, setFloating] = useState(false)
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return null

    const triggerHeight = 0

    const onScroll: ScrollEventHandler = event => {
      const scrollTop = window.scrollY

      if (!floating && scrollTop > triggerHeight) {
        setFloating(true)
      } else if (floating && scrollTop <= 0) {
        setFloating(false)
      }
    }

    onScroll(null)
    // setTimeout(() => setLoaded(true), 0)

    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [floating])

  return [floating, loaded]
}

export default function MainHeader() {
  const { locale } = useRouter()
  const { headerLinks } = useSettings()
  // const [floating, ref] = useOldFloating()
  const [floating, loaded] = useFloating()

  return (
    <header
      // ref={ref as LegacyRef<HTMLElement>}
      className={clsx(s.header, floating && s.floating, loaded && s.loaded)}>
      <div className="container">
        <div className={s.topBar}>
          <Link href="#" className={s.todo}>
            Some link here
          </Link>
        </div>
        <div className={s.content}>
          <Logo />
          <div className={s.linkList}>
            {headerLinks?.map((link, i) => (
              <MenuSection key={i} {...link} />
            ))}
            <Link
              href="/"
              locale={locale === "es-ES" ? "en-US" : "es-ES"}
              className={s.localeSwitch}>
              {locale === "es-ES" ? "EN" : "ES"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

type Link = schema.infer<typeof customUrlType>

type Column = {
  title: string
  color: string
} & (
  | {
      type: "single"
      items: {
        title: string
        description?: string
        icon: string
        url: string
      }[]
    }
  | {
      type: "double"
      items: {
        title: string
        icon: string
        url: string
      }[]
    }
)

export type Data = {
  sections: {
    text: string
    url: string
    hasDropdown?: boolean
    dropdown: {
      columns: Column[]
      bottomLink?: Link
      offset: number
    }
  }[]
}
