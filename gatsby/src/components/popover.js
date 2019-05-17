import React from "react"

const Popover = ({ icon, content }) => {
  return (
    <span
      rel="tooltip"
      data-proofer-ignore
      data-toggle="tooltip"
      data-html="true"
      data-content={content}
      style={{ color: "#0093c9" }}
    >
      <em className={`fa fa-${icon}`} />
    </span>
  )
}

export default Popover
