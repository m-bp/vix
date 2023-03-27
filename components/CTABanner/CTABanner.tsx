import clsx from "clsx"
import Button from "components/shared/Button"
import { getHref } from "lib/helpers"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { ctaBannerType } from "schemas"

import s from "./CTABanner.module.scss"

type Props = schema.infer<typeof ctaBannerType> & {}

function CTABanner({ cta, title }: Props) {
  return (
    <div className={clsx(s.wrapper)}>
      <img className={s.background} src="/cta-banner-background.svg" alt="" />
      <h2 className={s.title}>{title}</h2>
      <div className={s.ctaWrapper}>
        {cta?.map(({ _key, text, style, url }) => (
          <Link key={_key} href={getHref(url)}>
            <Button variant={style as const}>{text}</Button>
          </Link>
        ))}
      </div>
      {/* <div style={{ display: 'grid', gap: '1rem' }}>
        <Button href="#" variant="primary" withShadow>
          Click me
        </Button>
        <Button href="#" variant="secondary" withShadow>
          Click me
        </Button>
        <Button href="#" variant="tertiary" withShadow>
          Click me
        </Button>
        <Button href="#" variant="link" withShadow>
          Click me
        </Button>
      </div> */}
    </div>
  )
}

export default CTABanner
export type { Props as CTABannerProps }
