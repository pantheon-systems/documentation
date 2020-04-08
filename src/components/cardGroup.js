import React from "react"

const CardGroup = props => {
  return (
    <div className="flex-panel-group">
      {props.children.map(card => {
        return card
      })}
    </div>
  )
}

export default CardGroup
