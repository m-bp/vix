import Link from "next/link"

import s from "./Logo.module.scss"

type Props = {}

function Logo({}: Props) {
  return (
    <Link href="/" className={s.logo}>
      <span className={s.logoText}>VIXIEES</span>
    </Link>
  )
}

export default Logo
export type { Props as LogoProps }
