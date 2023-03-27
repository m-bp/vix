import type { ButtonProps } from "components/shared/Button"
import Button from "components/shared/Button"
import Link from "next/link"

type Props = { href: string } & ButtonProps

const ButtonLink = ({ href, children, ...props }: Props) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button as="a" {...props}>
        {children}
      </Button>
    </Link>
  )
}

export type { Props as ButtonLinkProps }
export default ButtonLink
