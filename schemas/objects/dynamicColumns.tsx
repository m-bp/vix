import { DocumentsIcon, InlineElementIcon } from "@sanity/icons"
import { s } from "sanity-typed-schema-builder"
import { checkedListItemType } from "schemas/objects/checkedListItem"
import { contactFormType } from "schemas/objects/contactForm"
import { ctaAsButtonType, ctaType } from "schemas/objects/cta"
import Preview from "schemas/objects/helpers/Preview"

const type = s.objectNamed({
  name: "dynamicColumns",
  title: "Dynamic Columns",
  icon: DocumentsIcon,

  fields: [
    {
      name: "title",
      title: "Title",
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: "Dynamic Columns",
      }),
    },
    {
      name: "position",
      title: "Media position",
      type: s.string({
        initialValue: "left",
        options: {
          list: [
            { title: "Left", value: "left" },
            { title: "Right", value: "right" },
          ],
        },
      }),
    },
    {
      name: "content",
      title: "Content",
      type: s.array({
        of: [
          s.objectNamed({
            name: "dynamicColumnsItem",
            title: "Dynamic Columns Item",
            icon: InlineElementIcon,

            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string(),
              },
              {
                name: "subtitle",
                title: "Subtitle",
                type: s.string(),
                optional: true,
              },
              {
                name: "content",
                title: "Content",
                type: s.array({
                  of: [s.block()],
                }),
              },
            ],
          }),
          s.objectNamed({
            name: "ctaGroup",
            title: "CTA Group",
            icon: InlineElementIcon,

            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string({
                  initialValue: "CTA Group",
                  hidden: true,
                }),
              },
              {
                name: "content",
                title: "Content",
                type: s.array({
                  of: [ctaAsButtonType.ref()],
                }),
              },
            ],
          }),
          s.objectNamed({
            name: "smallCheckedList",
            title: "Checked List",
            icon: InlineElementIcon,

            fields: [
              {
                name: "title",
                title: "Title",
                type: s.string({
                  initialValue: "Checked List",
                  hidden: true,
                }),
              },
              {
                name: "content",
                title: "Content",
                type: s.array({
                  of: [checkedListItemType],
                }),
              },
            ],
          }),
          ctaType.ref(),
        ],
      }),
    },
    {
      name: "media",
      title: "Media",
      type: s.array({
        max: 1,
        of: [s.image(), contactFormType.ref()],
      }),
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const dynamicColumnsType = type
export const dynamicColumnsSchema = type.schema()
