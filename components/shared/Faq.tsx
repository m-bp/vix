import Accordion from "components/shared/Accordion"
import { type ReactNode, useState } from "react"

type Props = {
  heading: string
  children: ReactNode
  defaultOpen?: boolean
  accordionClass?: string
  innerClass?: string
  headerClass?: string
}

function Faq({
  heading,
  children,
  defaultOpen,
  accordionClass,
  innerClass,
  headerClass,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Accordion
      heading={heading}
      isOpen={isOpen}
      onToggle={toggle}
      innerClass={accordionClass}
      headerClass={headerClass}>
      <div className={innerClass}>{children}</div>
      {/* {children} */}
    </Accordion>
  )
}

export default Faq
export type { Props as FaqProps }
