import React from "react"

import { Icon } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Product = ({ title, link, children }) => {
  return (
    <div className="product-card pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4">
      <h3 className="product-card__title">{title}</h3>

      <div className="product-card__text">{children}</div>

      <div className="product-card__link">
        <a href={link} target="_blank" className="pds-button">
          Learn More
          <Icon
            iconName="arrowRight"
            iconSize="md"
            className="pds-spacing-pad-inline-start-5xs"
          />
        </a>
      </div>
    </div>
  )
}

export default Product
