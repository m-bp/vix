import clsx from "clsx"
import Button from "components/shared/Button"
import ButtonLink from "components/shared/ButtonLink"
import { getHref } from "lib/helpers"
import { useRouter } from "next/router"
import { s as schema } from "sanity-typed-schema-builder"
import { ctaType } from "schemas"

import s from "./CTAButton.module.scss"

type Props = schema.infer<typeof ctaType> & {}

function CTAButton({ style, text, type, url }: Props) {
  const { locale } = useRouter()

  return type === "link" && url ? (
    <div className={clsx(s.wrapper)}>
      <ButtonLink href={getHref(url, locale)}>{text}</ButtonLink>
    </div>
  ) : (
    <div className={clsx(s.wrapper)}>
      <Button variant={style as "primary" | "secondary"}>{text}</Button>
    </div>
  )
}

export default CTAButton
export type { Props as CTAButtonProps }
