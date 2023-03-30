import { getHref } from "lib/helpers"
import { Settings } from "lib/sanity.queries"
import Image from "next/image"
import { useRouter } from "next/router"

import s from "./MenuColumn.module.scss"

type Props = Settings["headerLinks"][0]["dropdown"]["columns"][0]

type ItemProps = Props["items"][0] & {
  type: Props["type"]
}

function Item(x: ItemProps) {
  const { locale } = useRouter()

  return (
    <div className={s.item}>
      {x.icon ? (
        <div className={s.iconWrapper}>
          <Image alt="" src={`/icons/phone.svg`} width={16} height={16} />
        </div>
      ) : (
        <div className={s.icon} />
      )}
      <a href={getHref(x.url, locale)} className={s.itemLink}>
        <span className={s.itemTitle}>{x.title}</span>
        <span className={s.divider}>-</span>
        {x.type === "single" && x.description && (
          <span className={s.description}>{x.description}</span>
        )}
      </a>
    </div>
  )
}

function MenuColumn({ color, items, title, type }: Props) {
  return (
    <div className={s.wrapper} style={{ "--color": color }}>
      {title && <div className={s.title}>{title}</div>}
      <div className={s[`itemsWrapper${type}`]}>
        {items.map((x, i) => (
          <Item key={i} type={type} {...x} />
        ))}
      </div>
    </div>
  )
}

export default MenuColumn
export type { Props as MenuDropdownProps }
