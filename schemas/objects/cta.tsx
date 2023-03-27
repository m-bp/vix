import { s } from "sanity-typed-schema-builder"
import { customUrlType } from "schemas/objects/customUrl"

const options: Parameters<typeof s.objectNamed>[0] = {
  name: "customCta",
  title: "CTA",

  fields: [
    {
      name: "text",
      title: "Text",
      type: s.string(),
    },
    {
      name: "style",
      title: "Style",
      type: s.string({
        initialValue: "primary",
        hidden: ({ parent }) => parent?.type === "link",
        options: {
          list: ["primary", "primary-light", "secondary", "tertiary", "link"],
        },
      }),
    },
    {
      name: "url",
      title: "URL",
      type: customUrlType,
      optional: true,
    },
    {
      name: "type",
      type: s.string({
        hidden: ({ parent }) => !!parent?.hideType,
        options: {
          list: ["link", "button"],
        },
      }),
      optional: true,
    },
    {
      name: "hideType",
      type: s.boolean({
        hidden: true,
      }),
      optional: true,
    },
  ],
}

const type = s.objectNamed(options)

export const ctaType = type
export const ctaAsLinkType = s.objectNamed({
  ...options,
  initialValue: { type: "link", hideType: true },
})
export const ctaAsButtonType = s.objectNamed({
  ...options,
  initialValue: { type: "button", hideType: true },
})
export const ctaSchema = type.schema()
