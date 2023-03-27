import Anchor from "components/shared/Anchor"

import s from "./PreviewBanner.module.scss"

type Props = {
  preview?: boolean
  loading?: boolean
}

function PreviewBanner({ preview, loading }: Props) {
  if (!preview) return null

  return (
    <div className={s.wrapper}>
      <div className="container">
        <div className={s.innerContainer}>
          {loading ? "Loading... " : "This page is a preview. "}
          <Anchor
            href="/api/exit-preview"
            style={{ textDecoration: "underline" }}>
            Click here
          </Anchor>{" "}
          to exit preview mode.
        </div>
      </div>
    </div>
  )
}

export default PreviewBanner
export type { Props as PreviewBannerProps }
