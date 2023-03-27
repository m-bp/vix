import { InlineElementIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { textType } from "schemas/chunks/text"
import { ctaAsButtonType } from "schemas/objects/cta"

const type = s.objectNamed({
  name: "ctaCardGroupItem",
  title: "CTA Card Group Item",
  icon: InlineElementIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string(),
    },
    {
      name: "body",
      title: "Body",
      type: textType,
    },
    {
      name: "image",
      title: "Image",
      type: s.image(),
      optional: true,
    },
    {
      name: "cta",
      title: "CTA",
      type: ctaAsButtonType,
      optional: true,
    },
  ],
})

export const ctaCardGroupItemType = type
export const ctaCardGroupItemSchema = type.schema()
