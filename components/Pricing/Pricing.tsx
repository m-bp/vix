import clsx from "clsx"
import Button from "components/shared/Button"
import Faq from "components/shared/Faq"
import { getHref } from "lib/helpers"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { pricingType } from "schemas"

import s from "./Pricing.module.scss"

type Props = schema.infer<typeof pricingType> & {}

function Pricing({ content }: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        {content.map(
          ({
            headerType,
            cta,
            featured,
            features,
            title,
            price,
            subtitle,
            headerTitle,
          }) => (
            <div key={title} className={clsx(s.card, featured && s.featured)}>
              <div className={s.cardHeader}>
                <p className={s.name}>{title}</p>
                {headerType === "price" ? (
                  <p className={s.price}>{price}€</p>
                ) : (
                  <h3
                    className={s.title}
                    dangerouslySetInnerHTML={{
                      __html: headerTitle?.replace(/\n/g, "<br />"),
                    }}
                  />
                )}
                {subtitle && (
                  <p
                    className={s.subtitle}
                    dangerouslySetInnerHTML={{
                      __html: subtitle.replace(/\n/g, "<br />"),
                    }}
                  />
                )}
              </div>
              <div className={s.cardContent}>
                <Faq
                  heading="Features"
                  accordionClass={s.featureDropdown}
                  innerClass={s.featureList}>
                  {features.map((feature, i) => (
                    <div
                      key={feature + i}
                      dangerouslySetInnerHTML={{ __html: feature }}
                    />
                  ))}
                </Faq>
                <Link href={getHref(cta)} className={s.cta}>
                  <Button variant={cta.style}>{cta.text}</Button>
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Pricing
export type { Props as PricingProps }
