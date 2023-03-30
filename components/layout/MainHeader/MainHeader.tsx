/* eslint-disable react/jsx-key */
import closeSvg from "@material-design-icons/svg/filled/close.svg"
import menuSvg from "@material-design-icons/svg/filled/menu.svg"
import clsx from "clsx"
import BurgerMenuDropdown from "components/layout/MainHeader/BurgerMenuDropdown"
import Accordion from "components/shared/Accordion"
import Button from "components/shared/Button"
import Logo from "components/shared/Logo"
import { useSettings } from "context/SettingsContext"
import { getHref } from "lib/helpers"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ScrollEventHandler } from "sanity"
import { useMediaQuery } from "usehooks-ts"

import s from "./MainHeader.module.scss"
import MenuSection from "./MenuSection"

const useFloating = () => {
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return null

    const triggerHeight = 0

    const onScroll: ScrollEventHandler = () => {
      const scrollTop = window.scrollY

      if (!floating && scrollTop > triggerHeight) {
        setFloating(true)
      } else if (floating && scrollTop <= 0) {
        setFloating(false)
      }
    }

    onScroll(null)

    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [floating])

  return floating
}

export default function MainHeader() {
  const [burgerOpen, setBurgerOpen] = useState(false)
  const matches = useMediaQuery("(min-width: 1280px)")

  useEffect(() => {
    if (matches) setBurgerOpen(false)
  }, [matches])

  const { locale } = useRouter()
  const { headerLinks, headerTopLink, headerActions } = useSettings()
  const floating = useFloating()

  return (
    <>
      <header className={clsx(s.header, floating && s.floating)}>
        <div className="container">
          <div className={s.topBar}>
            {headerTopLink?.[0] && (
              <Link href={getHref(headerTopLink[0])} className={s.todo}>
                {headerTopLink[0].text}
              </Link>
            )}
          </div>
          <div className={s.content}>
            <Logo />
            <div className={s.linkList}>
              {headerLinks?.map((link, i) => (
                <MenuSection key={i} {...link} />
              ))}
              {headerActions?.map((link, i) => (
                <Button
                  key={link._key}
                  className={s.action}
                  href={getHref(link)}
                  style={{ paddingTop: "0.5rem ", paddingBottom: "0.5rem " }}
                  as="a">
                  {link.text}
                </Button>
              ))}
              <Link
                href="/"
                locale={locale === "es-ES" ? "en-US" : "es-ES"}
                className={s.localeSwitch}>
                {locale === "es-ES" ? "EN" : "ES"}
              </Link>
              <button
                className={s.burgerButton}
                onClick={() => setBurgerOpen(x => !x)}>
                <Image
                  alt=""
                  width={32}
                  height={32}
                  src={burgerOpen ? closeSvg : menuSvg}
                  style={{
                    filter:
                      "invert(52%) sepia(62%) saturate(536%) hue-rotate(170deg) brightness(84%) contrast(88%)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      {burgerOpen && <BurgerMenu />}
    </>
  )
}

function BurgerMenu() {
  const { headerLinks, headerTopLink, headerActions } = useSettings()

  return (
    <div className={s.burgerWrapper}>
      <div className={s.burgerContent}>
        <div className={s.burgerList}>
          {headerLinks?.map(link => (
            <Accordion key={link._key} heading={link.title} isOpen>
              {link.hasDropdown && (
                <BurgerMenuDropdown key={link._key} dropdown={link.dropdown} />
              )}
            </Accordion>
          ))}
        </div>
        <div className={s.burgerActions}>
          {headerActions?.map((link, i) => (
            <Button
              key={link._key}
              className={s.action}
              href={getHref(link)}
              as="a">
              {link.text}
            </Button>
          ))}
        </div>

        {headerTopLink?.[0] && (
          <Link href={getHref(headerTopLink[0])} className={s.todo}>
            {headerTopLink[0].text}
          </Link>
        )}
      </div>
    </div>
  )
}
