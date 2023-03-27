import { Slug } from "@sanity/types"
import { apiVersion } from "lib/sanity.api"
import { pageWithSlugQuery } from "lib/sanity.queries"
import { s } from "sanity-typed-schema-builder"
import { checkedListType } from "schemas/objects/checkedList"

const type = s.document({
  name: "page",
  title: "Page",

  // fieldsets: [
  //   {
  //     name: 'settings',
  //     title: 'Page Settings',
  //     options: {
  //       collapsed: true,
  //     },
  //   },
  //   {
  //     name: 'seo',
  //     title: 'SEO',
  //     options: {
  //       collapsed: true,
  //     },
  //   },
  // ],
  // groups: [
  //   {
  //     name: 'settings',
  //     title: 'Page Settings',
  //   },
  // ],

  fields: [
    {
      name: "locale",
      type: s.string({
        readOnly: true,
        hidden: true,
        initialValue: "es-ES",
      }),
    },
    {
      name: "title",
      title: "Title",
      type: s.string({
        validation: rule => rule.required(),
      }),
    },
    {
      name: "parent",
      type: s.string(),
      fieldset: "settings",
    },
    // ...seoFields(),
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
      name: "slug",
      title: "Slug",
      type: s.slug({
        options: {
          source: "title",
          maxLength: 96,
          // source(doc => `/${doc.locale}/${doc.title}`,
          slugify: input =>
            input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
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
        validation: rule => rule.required(),
      }),
      fieldset: "settings",
    },
    {
      name: "content",
      title: "Page Sections",
      type: s.array({
        of: [
          // pricingType.ref(),
          // dynamicColumnsType.ref(),
          // columnsType.ref(),
          // ctaBannerType.ref(),
          // featureListType.ref(),
          // ctaCardGroupType.ref(),
          // cardGroupType.ref(),
          // textBlockType.ref(),
          // spacerType.ref(),
          checkedListType.ref(),
        ],
      }),
    },
  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     parent: 'parent.title',
  //   },
  //   prepare: (value) => ({
  //     // @ts-ignore
  //     title: value.title,
  //     subtitle: value.parent ? `Parent: ${value.parent}` : null,
  //   }),
  // },
})

export const pageType = type
export const pageSchema = type.schema()
