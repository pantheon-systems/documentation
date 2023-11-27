import React from "react"
import { Icon as PDSIcon } from "@pantheon-systems/pds-toolkit-react"

const Icon = ({ icon, text }) => {
  return (
    <strong>
      <PDSIcon iconName={icon} /> {text}
    </strong>
  )
}
export default Icon
