import React from "react"

const ProductGroup = (props) => {
  return (
    <div
      className="pds-grid
    pds-spacing-pad-block-start-s pds-spacing-pad-block-end-3xl"
    >
      {props.children.map((product) => {
        return product
      })}
    </div>
  )
}

export default ProductGroup
