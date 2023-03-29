import { defineField } from "sanity"
import { s } from "sanity-typed-schema-builder"

export const seoFieldsClassic = () => {
  return [
    defineField({
      name: "seoTitle",
      type: "string",
      title: "Title",
      fieldset: "seo",
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "Description",
      rows: 3,
      fieldset: "seo",
    }),
    defineField({
      name: "seoHide",
      type: "boolean",
      title: "Hide from search engines",
      initialValue: false,
      fieldset: "seo",
    }),
  ]
}

export const seoFields = (): Parameters<typeof s.document>[0]["fields"] => [
  {
    name: "seoTitle",
    title: "Title",
    type: s.string(),
    fieldset: "seo",
  },
  {
    name: "seoDescription",
    title: "Description",
    type: s.text({
      rows: 3,
    }),
    fieldset: "seo",
  },
  {
    name: "seoHide",
    title: "Hide from search engines",
    type: s.boolean({
      initialValue: false,
    }),
    fieldset: "seo",
  },
]
