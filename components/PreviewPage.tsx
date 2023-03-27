import PageComponent from "components/Page"
import { usePreview } from "lib/sanity.preview"
import {
  type Page,
  pageQuery,
  type Settings,
  settingsQuery,
} from "lib/sanity.queries"

export default function PreviewPage({
  token,
  slug,
  locale,
}: {
  token: null | string
  slug: string
  locale: string
}) {
  const data: Page = usePreview(token, pageQuery, {
    slug,
    locale,
  })

  const settings: Settings = usePreview(token, settingsQuery, { locale }) || {}

  return <PageComponent preview data={data} settings={settings} />
}
