import { InlineElementIcon } from '@sanity/icons'
import { s } from 'sanity-typed-schema-builder'

const type = s.objectNamed({
  name: '__name__(camelCase)Item',
  title: '__name__(titleCase) Item',
  icon: InlineElementIcon,

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: s.string(),
    },
    {
      name: 'content',
      title: 'Content',
      type: s.array({
        of: [s.block()],
      }),
    },
  ],
})

export const __name__(camelCase)ItemType = type
export const __name__(camelCase)ItemSchema = type.schema()