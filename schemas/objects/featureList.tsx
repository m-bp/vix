import { DocumentsIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { textType } from "schemas/chunks/text"
import { ctaAsLinkType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"
import icon from "schemas/types/icon"

const type = s.objectNamed({
  name: "featureList",
  title: "Feature List",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Feature List",
      }),
    },
    {
      name: "center",
      title: "Center content",
      type: s.boolean({
        initialValue: false,
      }),
    },
    {
      name: "content",
      title: "Columns",
      type: s.array({
        of: [
          s.object({
            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string(),
              },
              {
                name: "icon",
                title: "Icon",
                type: icon(),
                optional: true,
              },
              {
                name: "body",
                title: "Body",
                type: textType,
              },
              {
                name: "cta",
                title: "CTA",
                type: ctaAsLinkType,
                optional: true,
              },
            ],
          }),
        ],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const featureListType = type
export const featureListSchema = type.schema()
