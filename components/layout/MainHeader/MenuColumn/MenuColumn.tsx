import { getHref } from "lib/helpers"
import { useRouter } from "next/router"

import { Data } from "../MainHeader"
import s from "./MenuColumn.module.scss"

type Props = Data["sections"][0]["dropdown"]["columns"][0]

function MenuColumn({ color, items, title, type }: Props) {
  const { locale } = useRouter()

  return (
    <div className={s.wrapper} style={{ "--color": color }}>
      {title && <div className={s.title}>{title}</div>}
      <div className={s[`itemsWrapper${type}`]}>
        {items.map((x, i) => (
          <div key={i} className={s.item}>
            <div className={s.icon} />
            <a href={getHref(x.url, locale)} className={s.itemLink}>
              <span className={s.itemTitle}>{x.title}</span>
              <span className={s.divider}>-</span>
              {type === "single" && x.description && (
                <span className={s.description}>{x.description}</span>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuColumn
export type { Props as MenuDropdownProps }
