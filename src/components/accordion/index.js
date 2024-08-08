import React from "react"

import { ExpansionPanel } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Accordion = ({ id, title, children }) => {
  const panelItems = [{ label: title, content: children }]

  return (
    <ExpansionPanel
      id={id}
      summary={title}
      className="docs-accordion"
    >
      {children}
    </ExpansionPanel>
  )
}

Accordion.defaultProps = {
  isCollapsed: true,
  active: false,
}

export default Accordion
