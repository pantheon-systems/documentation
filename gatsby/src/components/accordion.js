import React, { useState } from "react"

const Accordion = ({ id, icon, title, children }) => {
  const [isCollapsed] = useState(false)

  const classCollapsed = isCollapsed ? "collapse in" : "collapse"
  return (
    <>
      <div className="panel panel-drop panel-guide" id="accordion">
        <div className="panel-heading panel-drop-heading">
          <span
            style={{ cursor: "pointer" }}
            className={`accordion-toggle panel-drop-title ${
              isCollapsed ? "" : "collapsed"
            }`}
            data-toggle={classCollapsed}
            data-parent="#accordion"
            data-proofer-ignore=""
            data-target={`#${id}`}
            aria-expanded="false"
          >
            <h3 className="panel-title panel-drop-title info">
              <span className={`glyphicons glyphicons-${icon}`} />
              {title}
            </h3>
          </span>
        </div>
        <div id={`${id}`} className={classCollapsed} aria-expanded="false">
          <div className="panel-inner">{children}</div>
        </div>
      </div>
    </>
  )
}

export default Accordion
