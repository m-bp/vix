import Button, { ButtonProps } from "components/shared/Button"
import { getHref } from "lib/helpers"
import Link from "next/link"
import { s as schema } from "sanity-typed-schema-builder"
import { ctaType } from "schemas"

type Props = schema.infer<typeof ctaType> & {}

function CTAButton({ style, text, type, url }: Props) {
  return url ? (
    <Button as={Link} href={getHref(url)}>
      {text}
    </Button>
  ) : (
    <Button variant={style as ButtonProps["variant"]}>{text}</Button>
  )
}

export default CTAButton
export type { Props as CTAButtonProps }
