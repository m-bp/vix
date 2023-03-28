import { s } from "sanity-typed-schema-builder"

const color = () =>
  s.createType({
    ...s.string(),
    schema: () => ({ type: "color", options: { disableAlpha: true } } as const),
  })

export default color
