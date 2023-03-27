import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import Preview from "schemas/objects/helpers/Preview"

import { cardGroupItemType } from "./cardGroupItem"

const type = s.objectNamed({
  name: "cardGroup",
  title: "Card Group",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Card Group",
      }),
    },
    {
      name: "hasAnimation",
      title: "Animated",
      type: s.boolean({
        initialValue: true,
      }),
    },
    {
      name: "content",
      title: "Columns",
      type: s.array({
        of: [cardGroupItemType.ref()],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const cardGroupType = type
export const cardGroupSchema = type.schema()
