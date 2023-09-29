import React from "react"

const CardGroup = (props) => {
  return (
    <div
      className="pds-grid
    pds-spacing-pad-block-start-l pds-spacing-pad-block-end-3xl"
    >
      {props.children.map((card) => {
        return card
      })}
    </div>
  )
}

export default CardGroup
