import { StackIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "spacer",
  title: "Spacer",
  icon: StackIcon,

  fields: [
    {
      name: "size",
      title: "Size",
      type: s.number({
        initialValue: 24,
        options: {
          list: [
            {
              title: "Small",
              value: 12,
            },
            {
              title: "Medium",
              value: 24,
            },
            {
              title: "Large",
              value: 36,
            },
            {
              title: "XLarge",
              value: 60,
            },
            {
              title: "XXLarge",
              value: 120,
            },
          ],
        },
      }),
    },
    {
      name: "hr",
      title: "hr",
      type: s.boolean({
        initialValue: false,
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const spacerType = type
export const spacerSchema = type.schema()
