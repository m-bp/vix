import clsx from "clsx"

import __name__Item from "/__name__Item"
import s from "./__name__.module.scss"
import data from "./data"

type Props = {
  rowSize: number
  content: any[]
}

function Columns({ rowSize, content }: Props) {
  const childCount = content.length
  const rowCount = Math.round(childCount / rowSize)

  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        <div
          className={s.grid}
          style={
            {
              "--rowSize": rowSize,
              "--rowCount": rowCount,
            } as React.CSSProperties
          }>
          {content.map((child, i) => (
            <__name__Item key={`${i}${child._id}`} {...child} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Columns
export type { Props as ColumnsProps }
