import { Page, Settings } from "lib/sanity.queries"
import Head from "next/head"
import { useRouter } from "next/router"

type Props = {
  settings: Settings
  page?: Page
}

export default function Meta({ settings, page }: Props) {
  const router = useRouter()
  const { seoTitle, seoDescription } = settings

  const title = `${page?.seoTitle || page?.title} | ${seoTitle}`
  const description = page?.seoDescription || seoDescription
  const canonicalUrl = `https://vixiees.com${
    router.asPath === "/" ? "" : router.asPath
  }`.split("?")[0]

  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#082440" />
      <meta name="msapplication-TileColor" content="#0b80a3" />
      <meta name="theme-color" content="#ffffff" />

      <title>{title}</title>
      <meta name="description" content={description}></meta>

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {/* <meta property="og:locale" content="en_US" /> */}
      {/* <NextSeo title={title} description={description} /> */}
    </Head>
  )
}
