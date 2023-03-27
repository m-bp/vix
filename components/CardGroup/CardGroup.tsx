import clsx from "clsx"
import { getHref } from "lib/helpers"
import { urlForImage } from "lib/sanity.image"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { cardGroupType } from "schemas"
import { textType } from "schemas/chunks/text"

import s from "./CardGroup.module.scss"

type Props = schema.infer<typeof cardGroupType> & {}

function CardGroup({ content, hasAnimation }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper, hasAnimation && s.hasAnimation)}>
        {content.map(({ _key, title, body, image, cta }) => (
          <Link key={_key} href={getHref(cta)} className={s.link}>
            <div className={s.card}>
              {image && (
                <div className={s.imageWrapper}>
                  <img
                    src={urlForImage(image).width(400).url()}
                    className={s.image}
                    alt={image.alt}
                  />
                </div>
              )}
              <div className={s.cardContent}>
                <h3 className={s.title}>{title}</h3>
                <p
                  className={s.body}
                  dangerouslySetInnerHTML={{ __html: textType.parse(body) }}
                />
                <h3 className={s.cta}>{cta.text}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CardGroup
export type { Props as CardGroupProps }
