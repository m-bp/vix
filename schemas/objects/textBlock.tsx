import { LemonIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "textBlock",
  title: "Text Block",
  icon: LemonIcon,

  fields: [
    {
      name: "content",
      title: "Content",
      type: s.array({
        of: [s.block()],
      }),
    },
    {
      name: "align",
      title: "Align",
      type: s.string({
        initialValue: "left",
        options: {
          list: [
            { title: "Left", value: "left" },
            { title: "Center", value: "center" },
            { title: "Right", value: "right" },
          ],
        },
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const textBlockType = type
export const textBlockSchema = type.schema()
