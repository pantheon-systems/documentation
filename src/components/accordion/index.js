import React from "react"
import './style.css';

const Accordion = ({ id, icon, title, children, isCollapsed, active }) => {
  const classCollapsed = active ? "collapse in" : "collapse collapsed"

  return (
    <>
      <div className="panel panel-drop panel-guide accordion" id="accordion">
        <div className="panel-heading panel-drop-heading">
          <span
            style={{ cursor: "pointer" }}
            className={`accordion-toggle panel-drop-title ${classCollapsed}`}
            data-toggle="collapse"
            data-parent="#accordion"
            data-proofer-ignore=""
            data-target={`#${id}`}
            aria-expanded="false"
          >
            <h3 className="panel-title panel-drop-title info">
              <span className={`glyphicons glyphicons-${icon}`} />
              &nbsp;{title}
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

Accordion.defaultProps = {
  isCollapsed: true,
  active: false,
}

export default Accordion
