import renderBlock from "lib/renderBlock"
import { s as schema } from "sanity-typed-schema-builder"
import { columnsType } from "schemas"

import s from "./Columns.module.scss"

type Props = schema.infer<typeof columnsType> & {}

function Columns({ rowSize, content }: Props) {
  const childCount = content.length
  const rowCount = Math.round(childCount / rowSize)

  return (
    <div className="container">
      <div
        className={s.grid}
        style={
          {
            "--rowSize": rowSize,
            "--rowCount": rowCount,
          } as React.CSSProperties
        }>
        {content.map(child => (
          <div key={child._key}>{child.content.map(renderBlock)}</div>
        ))}
      </div>
    </div>
  )
}

export default Columns
export type { Props as ColumnsProps }
