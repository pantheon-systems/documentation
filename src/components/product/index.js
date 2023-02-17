import React from "react"
import './style.css';

const Product = ({ title, link, children }) => {
  return (
    <div className="flex-panel-item">
      <div className="flex-panel-body">
        <div className="flex-panel-title">
          <h3 className="plugin-title">{title}</h3>
        </div>
        <p className="topic-info__description">{children}</p>
        <a href={link} className="btn-primary btn get-plugin">
          Learn More
        </a>
      </div>
    </div>
  )
}

export default Product
