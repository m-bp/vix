import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import Heading from "components/Heading"
import Label from "components/Label"
import CTAButton from "components/shared/CTAButton"
import { urlForImage } from "lib/sanity.image"
import dynamic from "next/dynamic"
import { s as schema } from "sanity-typed-schema-builder"
import { dynamicColumnsType } from "schemas"

import s from "./DynamicColumns.module.scss"

const CheckedList = dynamic(() => import("components/CheckedList"))
const ContactForm = dynamic(() => import("components/ContactForm"))

type Props = schema.infer<typeof dynamicColumnsType> & {}

function DynamicColumns({ content, media, position }: Props) {
  const isMedia = media[0]._type === "image"

  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        <div
          className={clsx(isMedia ? s.unevenGrid : s.evenGrid, s[position])}
          style={{ "--position": position } as React.CSSProperties}>
          <div className={isMedia ? s.media : s.form}>
            {isMedia ? (
              <img src={urlForImage(media[0]).width(400).url()} alt="" />
            ) : (
              <ContactForm fullWidth />
            )}
          </div>
          <div className={s.content}>
            {content.map(({ _key, _type, ...rest }) =>
              _type === "dynamicColumnsItem" ? (
                <div key={_key} title={rest.title} className={s.itemWrapper}>
                  {rest.subtitle && <Label>{rest.subtitle}</Label>}
                  {rest.title && (
                    <Heading variant="2" className={s.itemHeading}>
                      {rest.title}
                    </Heading>
                  )}
                  {rest.content && <PortableText value={rest.content} />}
                </div>
              ) : _type === "ctaGroup" ? (
                <div key={_key} className={s.ctaGroup}>
                  {rest.content.map(cta => (
                    // <div key={cta._key}>{JSON.stringify(cta)}</div>
                    <CTAButton key={cta._key} {...cta} />
                  ))}
                </div>
              ) : _type === "smallCheckedList" ? (
                <div key={_key} className={s.ctaGroup}>
                  {rest.content.map(list => (
                    <CheckedList
                      key={list._key}
                      content={list.content.map(content => ({ content }))}
                    />
                  ))}
                </div>
              ) : (
                <CTAButton key={_key} {...rest} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicColumns
export type { Props as ColumnsProps }
