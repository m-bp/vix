import { Slug } from "@sanity/types"
import { apiVersion, dataset, projectId } from "lib/sanity.api"
import { pageWithSlugQuery } from "lib/sanity.queries"
import { createClient } from "next-sanity"
import { defineField, defineType } from "sanity"
import { seoFieldsClassic } from "schemas/chunks/seo"
import { pageType } from "schemas/documents/pageDummy"

// https://maxkarlsson.dev/blog/how-to-make-hierarchical-slugs-in-sanity
async function asyncSlugifier(input) {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })
  const parent = await client.fetch("*[_id == $id][0]", {
    id: input.doc.parent?._ref || "",
  })
  // if there's no parent assign an empty string, it will make the function return the current slug as the root
  const parentSlug =
    !parent?.slug?.current || parent?.slug?.current === "index"
      ? ""
      : `${parent?.slug?.current}/`
  const pageSlug = input.doc.title
    .toLowerCase()
    // slugify the title using a simple regex
    .replace(/\s+/g, "-")
    .slice(0, 200)
  return `${parentSlug}${pageSlug}`
}

const type = defineType({
  name: "page",
  title: "Page",
  type: "document",

  fieldsets: [
    {
      name: "settings",
      title: "Page Settings",
      options: {
        collapsed: true,
      },
    },
    {
      name: "seo",
      title: "SEO",
      options: {
        collapsed: true,
      },
    },
  ],
  groups: [
    {
      name: "settings",
      title: "Page Settings",
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: rule => rule.required(),
    }),
    defineField({
      name: "parent",
      type: "reference",
      to: [{ type: "page" }],
      fieldset: "settings",
      options: {
        filter: ({ document }) => {
          return {
            filter: `locale == $locale`,
            params: {
              locale: document.locale,
            },
          }
        },
      },
    }),
    ...seoFieldsClassic(),
    defineField({
      name: "locale",
      type: "string",
      // readOnly: true,
      initialValue: "es-ES",
      options: {
        list: ["es-ES", "en-US"],
      },
      fieldset: "settings",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        // source: 'title',
        maxLength: 96,
        // source(doc => `/${doc.locale}/${doc.title}`,
        // slugify: (input) =>
        //   input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        source: (doc, options) => ({ doc, options }),
        slugify: asyncSlugifier,
        isUnique: async (value, context) => {
          const pagesWithSlug = await context
            .getClient({ apiVersion })
            .fetch(pageWithSlugQuery, {
              self: context.document._id.replace("drafts.", ""),
              slug: value,
              locale: (context.parent as any).locale,
            })

          return pagesWithSlug === 0
        },
      },
      readOnly: ({ value, currentUser: { roles } }) => {
        return (
          !roles.find(({ name }) => name === "administrator") &&
          (value as Slug)?.current === "index"
        )
      },
      // validation: (rule) => rule.required(),
      fieldset: "settings",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Page Sections",
      of: [
        // { type: 'hero' },
        { type: "contactForm" },
        { type: "pricingTable" },
        { type: "pricing" },
        { type: "dynamicColumns" },
        { type: "columns" },
        { type: "ctaBanner" },
        { type: "featureList" },
        { type: "ctaCardGroup" },
        { type: "cardGroup" },
        { type: "textBlock" },
        { type: "spacer" },
        { type: "checkedList" },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      parent: "parent.title",
    },
    prepare: value => ({
      title: value.title,
      subtitle: value.parent ? `Parent: ${value.parent}` : null,
    }),
  },
})

export { pageType }
export const pageSchema = type
