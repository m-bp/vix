import { s } from "sanity-typed-schema-builder"
import IconInput from "schemas/inputs/IconInput"

import iconList from "../iconList.json"

const icon = () =>
  s.createType({
    ...s.string({
      options: {
        list: iconList as any,
      },
      components: {
        input: IconInput,
      },
    }),
  })

export default icon
