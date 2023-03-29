import clsx from "clsx"
import { getHref } from "lib/helpers"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { featureListType } from "schemas"

import s from "./FeatureList.module.scss"

type Props = schema.parsed<typeof featureListType> & {}

function FeatureList({ center, content }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        {content.map(({ _key, title, body, icon, cta }) => {
          const Wrapper = cta ? Link : "div"

          return (
            <Wrapper key={_key} href={getHref(cta)} className={s.link}>
              <div className={clsx(center ? s.cardCenter : s.card)}>
                <div className={s.iconWrapper}>
                  {icon && (
                    <img
                      className={s.icon}
                      src={`/icons/${icon}.svg`}
                      alt=""
                      width={24}
                      height={24}
                    />
                  )}
                </div>

                <h3 className={s.title}>{title}</h3>
                <p
                  className={s.body}
                  dangerouslySetInnerHTML={{
                    __html: body?.replace(/\n/g, "<br />"),
                  }}
                />
                {cta && <h3 className={s.cta}>{cta.text}</h3>}
              </div>
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}

export default FeatureList
export type { Props as FeatureListProps }
