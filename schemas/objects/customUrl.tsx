import { s } from "sanity-typed-schema-builder"
import { pageType } from "schemas/documents/page"

const options: Parameters<typeof s.objectNamed>[0] = {
  name: "customUrl",
  title: "Custom URL",

  options: {
    collapsed: false,
    collapsible: false,
  },

  fields: [
    {
      name: "external",
      title: "URL",
      type: s.url({
        hidden: ({ parent, value }) => !value && !!parent?.internal,
      }),
      optional: true,
    },
    {
      name: "internal",
      type: s.reference({
        to: [pageType],
        hidden: ({ parent, value }) => !value && !!parent?.external,
      }),
      optional: true,
    },
  ],
}

const type = s.objectNamed(options)

export const customUrlType = type
export const customUrlWithHiddenType = s.objectNamed({
  ...options,
  hidden: ({ parent }) => parent?.type && parent.type !== "link",
})
export const customUrlSchema = type.schema()
