import { HomeIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { ctaAsButtonType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "ctaBanner",
  title: "CTA Banner",
  icon: HomeIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string(),
    },
    {
      name: "cta",
      title: "CTA",
      type: s.array({
        of: [ctaAsButtonType],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const ctaBannerType = type
export const ctaBannerSchema = type.schema()
