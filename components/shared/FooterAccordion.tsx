import Accordion from "components/shared/Accordion"
import { type ReactNode, useState } from "react"

type Props = {
  heading: string
  children: ReactNode
  defaultOpen?: boolean
  accordionClass?: string
  innerClass?: string
}

function FooterAccordion({
  heading,
  children,
  defaultOpen,
  accordionClass,
  innerClass,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Accordion
      heading={heading}
      isOpen={isOpen}
      onToggle={toggle}
      innerClass={accordionClass}>
      <div className={innerClass}>{children}</div>
      {/* {children} */}
    </Accordion>
  )
}

export default FooterAccordion
export type { Props as FooterAccordionProps }
