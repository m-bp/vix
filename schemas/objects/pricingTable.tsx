import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaAsButtonType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "pricingTable",
  title: "Pricing Table",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Pricing Table",
      }),
    },
    {
      name: "columns",
      title: "Columns",
      type: s.array({
        length: 4,
        of: [s.string()],
      }),
    },
    {
      name: "content",
      title: "Content",
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
                name: "hint",
                title: "Hint",
                type: s.string(),
                optional: true,
              },
              {
                name: "values",
                title: "Values",
                type: s.array({
                  of: [
                    s.objectNamed({
                      name: "tableString",
                      title: "String",
                      fields: [
                        {
                          name: "title",
                          title: "Title",
                          type: s.string(),
                        },
                      ],
                    }),
                    s.objectNamed({
                      name: "check",
                      title: "Check",
                      fields: [
                        {
                          name: "title",
                          title: "Title",
                          type: s.string({
                            hidden: true,
                            initialValue: "Check",
                          }),
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
      name: "cta",
      title: "Bottom actions",
      type: s.array({
        length: 4,
        of: [ctaAsButtonType],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const pricingTableType = type
export const pricingTableSchema = type.schema()
