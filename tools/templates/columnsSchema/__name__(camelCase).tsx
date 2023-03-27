import { DocumentsIcon } from '@sanity/icons'
import { s } from 'sanity-typed-schema-builder'
import Preview from 'schemas/objects/helpers/Preview'

import { __name__(camelCase)ItemType } from './__name__(camelCase)Item'

const type = s.objectNamed({
  name: '__name__(camelCase)',
  title: '__name__(titleCase)',
  icon: DocumentsIcon,

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: s.string({
        hidden: true,
        readOnly: true,
        initialValue: '__name__(titleCase)',
      }),
    },
    {
      name: 'rowSize',
      title: 'Row Size',
      type: s.number({
        initialValue: 3,
      }),
    },
    {
      name: 'content',
      title: 'Columns',
      type: s.array({
        of: [__name__(camelCase)ItemType.ref()],
      })
    },
  ],

  components: {
    preview: () => (
      <Preview title={type.schema().title} icon={type.schema().icon} />
    ),
  },
})

export const __name__(camelCase)Type = type
export const __name__(camelCase)Schema = type.schema()