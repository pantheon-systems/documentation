import React from "react"

const Popover = ({ icon, content }) => {

  return (
    <a
      rel="tooltip"
      data-proofer-ignore
      data-toggle="tooltip"
      data-html="true"
      data-content={content}
    >
      <em className={`fa fa-${icon}`} />
    </a>
  )
}

export default Popover