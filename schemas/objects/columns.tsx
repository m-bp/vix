import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"
import { textBlockType } from "schemas/objects/textBlock"

const type = s.objectNamed({
  name: "columns",
  title: "Columns",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Columns",
      }),
    },
    {
      name: "rowSize",
      title: "Row Size",
      type: s.number({
        initialValue: 3,
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
                type: s.string({
                  hidden: true,
                  readOnly: true,
                  initialValue: "Column",
                }),
              },
              {
                name: "content",
                title: "Content",
                type: s.array({
                  of: [textBlockType, ctaType],
                }),
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

export const columnsType = type
export const columnsSchema = type.schema()
