import { InlineElementIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"

const type = s.objectNamed({
  name: "checkedListItem",
  title: "Checked List Item",
  icon: InlineElementIcon,

  fields: [
    {
      name: "content",
      type: s.array({
        of: [s.block()],
      }),
      title: "Content",
    },
  ],
})

export const checkedListItemType = type
export const checkedListItemSchema = type.schema()
