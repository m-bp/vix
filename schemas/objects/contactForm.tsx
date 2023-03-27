import { CaseIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "contactForm",
  title: "Contact Form",
  icon: CaseIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Contact Form",
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const contactFormType = type
export const contactFormSchema = type.schema()
