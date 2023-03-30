import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import { s as schema } from "sanity-typed-schema-builder"
import { checkedListType } from "schemas/objects/checkedList"

import s from "./CheckedList.module.scss"

type Props = schema.infer<typeof checkedListType> & {
  inline?: boolean
}

function CheckedList({ content, inline }: Props) {
  return (
    <div className={clsx(inline && "container")}>
      <div className={clsx(s.wrapper)}>
        {content.map(({ _key, content }, i) => (
          <div key={_key || i} className={s.item}>
            <div className={clsx(inline ? s.inlineText : s.text)}>
              <PortableText value={content} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckedList
export type { Props as CheckedListProps }
