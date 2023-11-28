import React from "react"
import { Icon as PDSIcon } from "@pantheon-systems/pds-toolkit-react"

const Icon = ({ icon, text }) => {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <strong>
        <PDSIcon
          iconName={icon}
          iconSize="sm"
          style={{ paddingInline: ".125rem" }}
        />{" "}
        {text}
      </strong>
    </span>
  )
}
export default Icon
