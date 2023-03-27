import { HomeIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "ctaBanner",
  title: "CTA Banner",
  icon: HomeIcon,

  /*
  validation: (rule) =>
    rule.custom((value) => {
      if (value.style !== 'image') return true
      if (value?.image?.asset) return true

      return 'Hero needs an image'
    }),
  */

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string(),
    },
    {
      name: "style",
      title: "Style",
      type: s.string({
        initialValue: "default",
        options: {
          list: ["default", "marker", "image"],
        },
      }),
    },
    {
      name: "colorTitle",
      title: "Colored Title",
      type: s.string({
        hidden: ({ parent }) => parent.style === "image",
      }),
    },
    {
      name: "image",
      title: "Image",
      type: s.image({
        options: {
          hotspot: true,
        },
        hidden: ({ parent }) => parent.style !== "image",
      }),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: s.string(),
    },
    {
      name: "cta",
      title: "CTA",
      type: s.array({
        of: [ctaType.ref()],
      }),
    },
  ],

  components: {
    preview: () => <Preview title={type.title} icon={type.icon} />,
  },
})

export const ctaBannerType = type
export const ctaBannerSchema = type.schema()
