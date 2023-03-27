import { DocumentsIcon, InlineElementIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "dynamicColumns",
  title: "Dynamic Columns",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Dynamic Columns",
      }),
    },
    {
      name: "position",
      title: "Media position",
      type: s.string({
        initialValue: "left",
        options: {
          list: [
            { title: "Left", value: "left" },
            { title: "Right", value: "right" },
          ],
        },
      }),
    },
    {
      name: "content",
      title: "Content",
      type: s.array({
        of: [
          s.objectNamed({
            name: "dynamicColumnsItem",
            title: "Dynamic Columns Item",
            icon: InlineElementIcon,

            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string(),
              },
              {
                name: "subtitle",
                title: "Subtitle",
                type: s.string(),
                optional: true,
              },
              {
                name: "content",
                title: "Content",
                type: s.array({
                  of: [s.block()],
                }),
              },
            ],
          }),
          ctaType.ref(),
        ],
      }),
    },
    {
      name: "media",
      title: "Media",
      type: s.array({
        max: 1,
        of: [
          s.image(),
          // TODO: Add forms
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

export const dynamicColumnsType = type
export const dynamicColumnsSchema = type.schema()
