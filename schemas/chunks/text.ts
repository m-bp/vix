import { s } from "sanity-typed-schema-builder"

export const textType = s.createType({
  ...s.text({
    zod: zod => zod.transform(value => value.replace(/\n/, "<br />")),
  }),
})
