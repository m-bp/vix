import clsx from "clsx"
import Button from "components/shared/Button"
import { getHref } from "lib/helpers"
import { urlForImage } from "lib/sanity.image"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { ctaCardGroupType } from "schemas"

import s from "./CTACardGroup.module.scss"

type Props = schema.infer<typeof ctaCardGroupType> & {}

function CTACardGroup({ content }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        {content.map(({ _key, title, body, image, cta }) => (
          <div key={_key} className={s.card}>
            {image && (
              <img
                alt=""
                src={urlForImage(image).width(400).url()}
                className={s.image}
              />
            )}
            <div className={s.cardContent}>
              <h3 className={s.title}>{title}</h3>
              <p
                className={s.body}
                dangerouslySetInnerHTML={{
                  __html: body.replace(/\n/g, "<br />"),
                }}
              />
              {cta?.url &&
                (cta.style === "options" ? (
                  <Button className={s.cta}>{cta.text}</Button>
                ) : (
                  <Link href={getHref(cta.url)}>
                    <Button className={s.cta} variant={cta.style}>
                      {cta.text}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CTACardGroup
export type { Props as CTACardGroupProps }
