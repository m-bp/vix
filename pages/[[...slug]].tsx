import PageComponent from "components/Page"
import { apiVersion, dataset, projectId } from "lib/sanity.api"
import {
  Page,
  pageQuery,
  pageSlugsQuery,
  Settings,
  settingsQuery,
} from "lib/sanity.queries"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { createClient } from "next-sanity"
import { lazy } from "react"

const PreviewSuspense = lazy(() => import("components/shared/PreviewSuspense"))
const PreviewPage = lazy(() => import("components/PreviewPage"))

export const getStaticProps: GetStaticProps<
  {
    preview?: boolean
    token?: string
    data: Page
    settings: Settings
    locale: string
  },
  { slug: string[] },
  { token?: string }
> = async ({ params, locale, preview = false, previewData = {} }) => {
  const token = previewData?.token || null
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: preview,
    token: token || undefined,
  })

  let slug = params?.slug?.join("/")

  if (!slug || slug === "") slug = ""

  const dataPromise = await client.fetch<Page>(pageQuery, {
    slug,
    locale,
  })

  const settingsPromise = await client.fetch<Settings>(settingsQuery, {
    locale,
  })

  return {
    props: {
      preview,
      token,
      data: dataPromise || ({} as any),
      settings: settingsPromise || {},
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    // revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  if (!projectId) return {} as ReturnType<GetStaticPaths>

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })

  const pageDataWithLocale = await Promise.all(
    locales.map(async locale => {
      const data = await client.fetch(pageSlugsQuery, { locale })

      return { data, locale }
    })
  )

  return {
    paths: pageDataWithLocale
      .map(({ data, locale }) =>
        data.map(({ slug }) => ({
          params: {
            slug: [slug],
          },
          locale,
        }))
      )
      .flat(),
    fallback: "blocking" as const,
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

function Index({ preview, token, data, settings, locale }: Props) {
  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PageComponent preview loading data={data} settings={settings} />
        }>
        <PreviewPage token={token} slug={data?.slug} locale={locale} />
      </PreviewSuspense>
    )
  }

  return <PageComponent data={data} settings={settings} />
}

export default Index
