import clsx from "clsx"
import Button from "components/shared/Button"
import { getHref } from "lib/helpers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ScrollEventHandler } from "sanity"
import { s as schema } from "sanity-typed-schema-builder"
import { pricingTableType } from "schemas"

import s from "./PricingTable.module.scss"

type Props = schema.infer<typeof pricingTableType> & {}

const useFloating = () => {
  const [floating, setFloating] = useState(false)
  const [offset, setOffset] = useState(0)

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

      setOffset(window.scrollY - 80 - 50)
    }

    onScroll(null)

    window.addEventListener("scroll", onScroll)
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [floating])

  return [floating, offset]
}

function isElementInViewport(rect, w) {
  return (
    rect &&
    w &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= w.innerHeight &&
    rect.right <= w.innerWidth
  )
}

function PricingTable({ columns, content, cta }: Props) {
  const { locale } = useRouter()
  // const ref = useRef(null)
  // const b = useBoundingClientRect(ref, EListener.ON_SCROLL_AND_RESIZE)
  // const wrapperRef = useRef(null)
  // const a = useScroll(wrapperRef)
  // const w = useWindowSize()
  // const [floating] = useFloating()

  // if (typeof window !== 'undefined') console.log(b, w)

  // const ff = typeof window !== 'undefined' && floating && b?.y > b?.height

  return (
    <div className="container">
      <div className={clsx(s.wrapper)} /*ref={wrapperRef}*/>
        {/* <div className={s[`floating${floating ? 'y' : 'n'}`]}>{offset}</div> */}

        {/* <table
          className={clsx(s.table, s[`floating${ff ? 'y' : 'n'}`])}
          style={{
            '--tableWidth': `${b?.width}px`,
            '--tableOffset': `${a?.x}px`,
          }}
        >
          <thead className={s.head}>
            <tr className={s.headRow}>
              <th className={s.firstColumn}></th>
              {columns.map((column, i) => (
                <th key={column + i} className={s.headColumn}>
                  <div>{column}</div>
                </th>
              ))}
            </tr>
          </thead>
        </table> */}

        <table className={s.table} /*ref={ref}*/>
          <thead className={s.head}>
            <tr className={s.headRow}>
              <th className={s.firstColumn}></th>
              {columns.map((column, i) => (
                <th key={column + i} className={s.headColumn}>
                  <div>{column}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={s.body}>
            {[...content, ...content, ...content, ...content].map(
              ({ _key, title, hint, values }) => (
                <tr key={_key} className={s.row}>
                  <td className={s.firstColumn}>
                    <div>
                      {title}
                      {hint && (
                        <span className={s.hintWrapper}>
                          ℹ️
                          <span className={s.hint}>{hint}</span>
                        </span>
                      )}
                    </div>
                  </td>
                  {values.map(({ _key, _type, title }) =>
                    _type === "check" ? (
                      <td key={_key} className={s.column}>
                        <div>✅</div>
                      </td>
                    ) : (
                      <td key={_key} className={s.column}>
                        <div>{title}</div>
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
        <table className={clsx(s.table)}>
          <thead className={s.head}>
            <tr className={s.headRow}>
              <th className={s.firstColumn}></th>
              {cta.map(({ _key, text, style, url }) => (
                <th key={_key} className={s.ctaColumn}>
                  <Button as="a" href={getHref(url, locale)} variant={style}>
                    {text}
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}

export default PricingTable
export type { Props as PricingTableProps }
