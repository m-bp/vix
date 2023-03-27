import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { textType } from "schemas/chunks/text"
import { ctaAsButtonType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "pricing",
  title: "Pricing",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Pricing",
      }),
    },
    {
      name: "content",
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
                name: "featured",
                title: "Featured",
                type: s.boolean({
                  initialValue: false,
                }),
              },
              {
                name: "headerType",
                title: "Header Type",
                type: s.string({
                  options: {
                    list: ["price", "custom"],
                  },
                  initialValue: "price",
                }),
              },
              {
                name: "headerTitle",
                title: "Header Title",
                // type: s.string({
                //   hidden: ({ parent }) => parent.headerType === 'price',
                // }),
                type: textType,
                optional: true,
              },
              {
                name: "price",
                title: "Price",
                type: s.number({
                  greaterThan: -1,
                  hidden: ({ parent }) => parent.headerType === "custom",
                }),
                optional: true,
              },
              {
                name: "subtitle",
                title: "Header Subtitle",
                type: s.text(),
                optional: true,
              },
              {
                name: "features",
                title: "Features",
                type: s.array({
                  of: [s.string()],
                }),
              },
              {
                name: "cta",
                title: "CTA",
                type: ctaAsButtonType,
              },
            ],
          }),
        ],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const pricingType = type
export const pricingSchema = type.schema()
