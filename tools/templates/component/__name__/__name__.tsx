import clsx from "clsx"

import s from "./__name__.module.scss"
import data from "./data"

type Props = {}

function __name__({}: Props) {
  return (
    <div className="container">
      <div className={clsx(s.wrapper)}></div>
    </div>
  )
}

export default __name__
export type { Props as __name__Props }
