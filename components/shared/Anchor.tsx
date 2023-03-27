import clsx from "clsx"
import type { LinkProps } from "next/link"
import Link from "next/link"

type Props = {
  external?: boolean
} & LinkProps &
  React.ComponentPropsWithoutRef<"a">

const Anchor = ({ external, children, ...props }: Props) => {
  const Tag = external ? "a" : Link

  return (
    // TODO
    <Tag {...props} className={clsx("hover:underline", props.className)}>
      {children}
    </Tag>
  )
}

export default Anchor
export type { Props as AnchorProps }
