import PageComponent from "components/Page"
import { apiVersion, dataset, projectId } from "lib/sanity.api"
import {
  type Page,
  pageQuery,
  pageSlugsQuery,
  type Settings,
  settingsQuery,
} from "lib/sanity.queries"
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next"
import { createClient } from "next-sanity"
import { lazy } from "react"

const PreviewSuspense = lazy(() => import("components/shared/PreviewSuspense"))
const PreviewPage = lazy(() => import("components/PreviewPage"))

export const getPagePaths =
  (locale): GetStaticPaths =>
  async () => {
    let paths = []
    if (projectId) {
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      })
      paths = await client.fetch(pageSlugsQuery, { locale })
    }

    return {
      paths: paths
        .map(({ slug, parent }) => {
          return {
            params: {
              slug: [parent, slug].filter(x => x === "index"),
            },
          }
        })
        .concat({ params: { slug: ["index"] } }),
      fallback: "blocking",
    }
  }

export const getPageStaticProps =
  (
    locale,
    path = ""
  ): GetStaticProps<
    {
      preview?: boolean
      token?: string
      data: Page
      settings: Settings
    },
    { slug: string[] },
    { token?: string }
  > =>
  async ({ params, locale, preview = false, previewData = {} }) => {
    const token = previewData?.token || null
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: preview,
      token: token || undefined,
    })

    let slug = path || params?.slug?.join("/")

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
      },
      // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
      // revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
      revalidate: 60,
    }
  }

export type StaticProps = InferGetStaticPropsType<
  ReturnType<typeof getPageStaticProps>
>

export type ComponentProps = StaticProps & { locale: string }

export default function Component({
  preview,
  token,
  data,
  settings,
  locale,
}: ComponentProps) {
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
