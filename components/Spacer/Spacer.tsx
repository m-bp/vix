import { s as schema } from "sanity-typed-schema-builder"
import { spacerType } from "schemas/objects/spacer"

import s from "./Spacer.module.scss"

type Props = schema.infer<typeof spacerType> & {}

function Spacer({ size, hr }: Props) {
  return (
    <div className="container">
      <div className={s.wrapper} style={{ height: `${size}px` }}>
        {hr && <hr className={s.hr} />}
      </div>
    </div>
  )
}

export default Spacer
export type { Props as SpacerProps }
