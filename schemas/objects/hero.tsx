import { HomeIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"
import Preview from "schemas/objects/helpers/Preview"

const type = defineType({
  name: "hero",
  type: "object",
  title: "Hero",
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
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "style",
      type: "string",
      title: "Style",
      initialValue: "default",
      options: {
        list: ["default", "marker", "image"],
      },
    }),
    defineField({
      name: "colorTitle",
      type: "string",
      title: "Colored Title",
      hidden: ({ parent }) => parent.style === "image",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent.style !== "image",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
    }),
    defineField({
      name: "cta",
      type: "array",
      title: "CTA",
      of: [{ type: "cta" }],
    }),
  ],

  components: {
    preview: () => <Preview title={type.title} icon={type.icon} />,
  },
})

export default type
