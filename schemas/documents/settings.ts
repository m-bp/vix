import { CogIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaAsLinkType, ctaType } from "schemas/objects/cta"
import { customUrlType } from "schemas/objects/customUrl"

const color = () =>
  s.createType({
    ...s.string(),
    schema: () => ({ type: "color", options: { disableAlpha: true } } as const),
  })

const type = s.document({
  name: "settings",
  title: "Settings",
  icon: CogIcon,

  fieldsets: [
    {
      name: "seo",
      title: "SEO",
      description: "These settings can be overriden by individual pages",
    },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
  ],

  fields: [
    {
      name: "locale",
      type: s.string({
        // readOnly: true,
        // hidden: true,
        options: {
          list: ["es-ES", "en-US"],
        },
      }),
    },
    {
      name: "title",
      title: "Title",
      type: s.string({
        initialValue: "Web",
        validation: rule => rule.required(),
      }),
    },
    {
      name: "headerLinks",
      title: "Links",
      type: s.array({
        of: [
          s.object({
            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string(),
              },
              {
                name: "url",
                title: "URL",
                type: customUrlType,
              },
              {
                name: "hasDropdown",
                title: "Has Dropdown",
                type: s.boolean({
                  initialValue: false,
                }),
              },
              {
                name: "dropdown",
                title: "Dropdown",
                type: s.object({
                  hidden: ({ parent }) => !parent?.hasDropdown,

                  fields: [
                    {
                      name: "title",
                      title: "Title",
                      type: s.string({
                        hidden: true,
                        initialValue: "Dropdown",
                      }),
                    },
                    {
                      name: "columns",
                      title: "Columns",
                      type: s.array({
                        of: [
                          s.object({
                            fields: [
                              {
                                name: "title",
                                title: "Title",
                                type: s.string(),
                                optional: true,
                              },
                              {
                                name: "color",
                                title: "Color",
                                type: s.string(),
                              },
                              {
                                name: "type",
                                title: "Type",
                                type: s.string({
                                  options: {
                                    list: ["single", "double"],
                                  },
                                }),
                              },
                              {
                                name: "items",
                                title: "Items",
                                type: s.array({
                                  of: [
                                    s.object({
                                      fields: [
                                        {
                                          name: "title",
                                          title: "Title",
                                          type: s.string(),
                                        },
                                        {
                                          name: "description",
                                          title: "Description",
                                          type: s.string(),
                                          optional: true,
                                        },
                                        {
                                          name: "icon",
                                          title: "Icon",
                                          type: s.string(),
                                          optional: true,
                                        },
                                        {
                                          name: "url",
                                          title: "URL",
                                          type: customUrlType,
                                        },
                                      ],
                                    }),
                                  ],
                                }),
                              },
                            ],
                          }),
                        ],
                      }),
                    },
                    {
                      name: "offset",
                      title: "Offset",
                      description: "Used to position the dropdown",
                      type: s.number(),
                    },
                    {
                      name: "bottomLink",
                      title: "Bottom link",
                      type: s.array({
                        max: 1,
                        of: [ctaAsLinkType],
                      }),
                      optional: true,
                    },
                  ],
                }),
              },
            ],
          }),
        ],
      }),
      fieldset: "header",
    },
    {
      name: "footerLogo",
      title: "Logo",
      type: s.image(),
      fieldset: "footer",
    },
    {
      name: "footerColumns",
      title: "Columns",
      type: s.array({
        of: [
          s.object({
            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string(),
              },
              {
                name: "content",
                title: "Columns",
                type: s.array({ of: [ctaType.ref()] }),
              },
            ],
          }),
        ],
      }),
      fieldset: "footer",
    },
    {
      name: "footerBottomLinks",
      title: "Bottom Links",
      type: s.array({
        // TODO: filter by locale ?
        of: [ctaAsLinkType],
      }),
      fieldset: "footer",
    },
    {
      name: "footerBottomText",
      title: "Bottom Text",
      type: s.text(),
      fieldset: "footer",
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
  ],

  preview: {
    select: {
      locale: "locale",
    },
    prepare: value => ({
      title: `Settings (${value.locale})`,
    }),
  },
})

export const settingsType = type
export const settingsSchema = type.schema()
