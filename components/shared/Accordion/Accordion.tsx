import Collapse from "@kunukn/react-collapse"
import clsx from "clsx"
import ChevronDown from "components/shared/icons/ChevronDown"
import { ReactNode } from "react"

import s from "./Accordion.module.scss"

type ChevronProps = {
  isOpen: boolean
}

function Chevron({ isOpen }: ChevronProps) {
  return (
    <div className={clsx(s.chevron, isOpen && s.chevronOpen)}>
      <ChevronDown />
    </div>
  )
}

type AccordionHeaderProps = {
  heading: string
  onToggle: () => void
  isOpen: boolean
  headerClass?: string
}

const AccordionHeader = ({
  heading,
  onToggle,
  isOpen,
  headerClass,
}: AccordionHeaderProps) => (
  <button
    className={clsx(s.header, headerClass)}
    aria-expanded={isOpen}
    onClick={onToggle}>
    <span>{heading}</span>
    <Chevron isOpen={isOpen} />
  </button>
)

type AccordionProps = {
  children: ReactNode
  innerClass?: string
} & AccordionHeaderProps

function Accordion({
  children,
  isOpen,
  heading,
  onToggle,
  innerClass,
  headerClass,
}: AccordionProps) {
  return (
    <div className={clsx(s.accordion, isOpen ? s.isOpen : s.isClosed)}>
      <AccordionHeader {...{ heading, onToggle, isOpen, headerClass }} />

      <Collapse
        className={clsx(s.collapse, innerClass)}
        aria-hidden={!isOpen}
        isOpen={isOpen}>
        {children}
      </Collapse>
    </div>
  )
}

export default Accordion
