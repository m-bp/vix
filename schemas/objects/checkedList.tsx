import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { checkedListItemType } from "schemas/objects/checkedListItem"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "checkedList",
  title: "Checked List",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Checked List",
      }),
    },
    {
      name: "rowSize",
      title: "Row Size",
      type: s.number({
        initialValue: 4,
        hidden: true,
      }),
    },
    {
      name: "content",
      title: "Columns",
      type: s.array({
        of: [checkedListItemType.ref()],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const checkedListType = type
export const checkedListSchema = type.schema()
