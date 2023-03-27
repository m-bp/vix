import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import CTAButton from "components/CTAButton"
import Heading from "components/Heading/Heading"
import Label from "components/Label"
import { urlForImage } from "lib/sanity.image"
import { s as schema } from "sanity-typed-schema-builder"
import { dynamicColumnsType } from "schemas"

import s from "./DynamicColumns.module.scss"

type Props = schema.infer<typeof dynamicColumnsType> & {}

function Columns({ content, media, position }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        <div
          className={clsx(s.grid, s[position])}
          style={{ "--position": position } as React.CSSProperties}>
          <div className={s.media}>
            {media[0]._type === "image" ? (
              <img src={urlForImage(media[0]).width(400).url()} alt="" />
            ) : (
              <div>{media[0].title}</div>
            )}
          </div>
          <div className={s.content}>
            {content.map(({ _key, _type, ...rest }) =>
              _type === "dynamicColumnsItem" ? (
                <div key={_key} title={rest.title} className={s.itemWrapper}>
                  <Label>{rest.subtitle}</Label>
                  <Heading variant="2" className={s.itemHeading}>
                    {rest.title}
                  </Heading>
                  <PortableText value={rest.content} />
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

export default Columns
export type { Props as ColumnsProps }
