import Layout from "components/layout/MainLayout"
import SettingsContextProvider from "context/SettingsContext"
import renderBlock from "lib/renderBlock"
import type { Page, Settings } from "lib/sanity.queries"
import ErrorPage from "next/error"
import { useRouter } from "next/router"

type Props = {
  preview?: boolean
  loading?: boolean
  data: Page
  settings: Settings
}

export default function PageComponent({
  preview,
  loading,
  data,
  settings,
}: Props) {
  const router = useRouter()

  const page = data
  const slug = page?.slug

  if (!router.isFallback && !slug && !preview) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <SettingsContextProvider settings={settings}>
      <Layout preview={preview} loading={loading} page={page}>
        {router.isFallback || (preview && !page) ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <article>{page.content?.map(renderBlock)}</article>
          </>
        )}
      </Layout>
    </SettingsContextProvider>
  )
}
