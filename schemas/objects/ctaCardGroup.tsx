import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import Preview from "schemas/objects/helpers/Preview"

import { ctaCardGroupItemType } from "./ctaCardGroupItem"

const type = s.objectNamed({
  name: "ctaCardGroup",
  title: "CTA Card Group",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "CTA Card Group",
      }),
    },
    {
      name: "content",
      title: "Columns",
      type: s.array({
        of: [ctaCardGroupItemType],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const ctaCardGroupType = type
export const ctaCardGroupSchema = type.schema()
