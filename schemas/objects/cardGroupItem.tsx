import { InlineElementIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { textType } from "schemas/chunks/text"
import { ctaAsLinkType } from "schemas/objects/cta"

const type = s.objectNamed({
  name: "cardGroupItem",
  title: "Card Group Item",
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
      type: s.image({
        hotspot: true,
        fields: [
          {
            name: "alt",
            title: "Alt Description",
            type: s.string(),
            optional: true,
          },
        ],
      }),
      optional: true,
    },
    {
      name: "cta",
      title: "CTA",
      type: ctaAsLinkType,
      optional: true,
    },
  ],
})

export const cardGroupItemType = type
export const cardGroupItemSchema = type.schema()
