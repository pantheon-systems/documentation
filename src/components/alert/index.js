import React from "react"

import { Callout } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Alert = ({ title, type, icon, children }) => {
  // Recalibrate types for this site.
  if (type === "danger") {
    type = "warning"
  } else if (type === "export") {
    type = "code"
  } else {
    type = type
  }

  return (
    <Callout
      children={children}
      type={type}
      title={title}
      className="docs-alert"
    />
  )
}

export default Alert
