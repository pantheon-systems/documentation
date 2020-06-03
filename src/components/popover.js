import React from "react"

const Popover = ({ icon, title, content }) => {
  return (
    <>
      <span
        rel="tooltip"
        data-proofer-ignore
        data-toggle="popover"
        data-html="true"
        data-title={title}
        data-content={content}
        style={{ color: "rgb(18, 124, 187)" }}
      >
        <em className={`fa fa-info-circle`} />
      </span>
    </>
  )
}

export default Popover
