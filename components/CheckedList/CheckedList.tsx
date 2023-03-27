import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import { s as schema } from "sanity-typed-schema-builder"
import { checkedListType } from "schemas/objects/checkedList"

import s from "./CheckedList.module.scss"

type Props = {} & schema.infer<typeof checkedListType>

function CheckedList({ content }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        {content.map(({ _key, title, content }) => (
          <div key={_key} className={s.item}>
            <div className={s.check} />
            {/* <div
              className={s.text}
              dangerouslySetInnerHTML={{ __html: content }}
            /> */}

            <div className={s.text}>
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
