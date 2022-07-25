import React from "react"

const ProductGroup = props => {
  return (
    <div className="flex-panel-group">
      {props.children.map(product => {
        return product
      })}
    </div>
  )
}

export default ProductGroup
