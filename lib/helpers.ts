import { s } from "sanity-typed-schema-builder"
import { ctaType } from "schemas"
import { customUrlType } from "schemas/objects/customUrl"

type CTA = s.infer<typeof ctaType>
type URL = s.infer<typeof customUrlType>

const isCTA = (input: CTA | URL | string): input is CTA =>
  (input as CTA)._type === "customCta" || !!(input as CTA).url

const appendLocale = (input: string, locale: string) =>
  locale ? `/${locale}/${input}` : `/${input}`

export const getHref = (input: CTA | URL | string, locale?: string): string => {
  const url = isCTA(input) ? input.url : input

  if (typeof url === "string") return appendLocale(url, locale)

  return typeof url.external === "string"
    ? url.external
    : typeof url.internal === "string"
    ? appendLocale(url.internal, locale)
    : ""
  // (() => {
  //   throw new Error(`Could not get href ${JSON.stringify(input)}`)
  // })()
}

export const getParent = (input: any) => {
  if (!input) return ""

  return `${getParent(input.parent)}/${input.slug}`
}
