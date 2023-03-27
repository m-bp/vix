import "styles/index.scss"

import type { AppProps } from "next/app"
import { useMemo, useState } from "react"
import GlobalStyles from "styles/GlobalStyles"

/**
 * Fix for Chrome: Turns off transitions during load to prevent
 * transition animations from unstyled content to styled content.
 * See: https://github.com/vercel/next.js/issues/25487
 */
const ChromeFixUnstyledTransitions = () => {
  const [allowTransitions, setAllowTransitions] = useState(false)

  // Run this once during render.
  useMemo(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", function () {
        setAllowTransitions(true)
      })
    }
  }, [])

  if (allowTransitions) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: ` *, *::before, *::after { transition: none!important; } `,
      }}
    />
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
      {/* <ChromeFixUnstyledTransitions /> */}
    </>
  )
}
