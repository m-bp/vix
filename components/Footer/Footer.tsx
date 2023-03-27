import clsx from "clsx"
import Faq from "components/shared/Faq"
import { useSettings } from "context/SettingsContext"
import { getHref } from "lib/helpers"
import { urlForImage } from "lib/sanity.image"
import { useRouter } from "next/router"

import s from "./Footer.module.scss"

type Props = {}

function Footer({}: Props) {
  const { locale } = useRouter()
  const { footerLogo, footerColumns, footerBottomLinks, footerBottomText } =
    useSettings()

  return (
    <div className={clsx("container", s.wrapper)}>
      <hr className={s.divider} />
      <footer className={s.footer}>
        <div className={s.logo}>
          {footerLogo && (
            <img src={urlForImage(footerLogo).url()} alt="Vixiees logo" />
          )}
        </div>
        {footerColumns?.map(({ _key, title, content }) => (
          <div key={_key} className={s.column}>
            <h2 className={s.title}>{title}</h2>
            <Faq
              heading={title}
              accordionClass={s.columnCollapse}
              innerClass={s.featureDropdown}
              headerClass={s.columnHeader}>
              {content.map(({ _key, text, url }, i) => (
                <div key={_key} className={s.item}>
                  <a href={getHref(url, locale)} className={s.link}>
                    {text}
                  </a>
                </div>
              ))}
            </Faq>
            <hr className={s.divider} />
          </div>
        ))}
      </footer>
      <hr className={s.divider} />
      <div className={s.bottomLinks}>
        {footerBottomLinks?.map(({ _key, text, url }) => (
          <a key={_key} href={getHref(url, locale)} className={s.link}>
            {text}
          </a>
        ))}
      </div>
      <div className={s.bottomText}>{footerBottomText}</div>
    </div>
  )
}

export default Footer
export type { Props as FooterProps }
