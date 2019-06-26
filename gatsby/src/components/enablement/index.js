import React from "react"
import './style.css';

const Enablement = ({ title, link, children }) => {
  return (
    <div className="enablement">
      <h4 className="info">
        <a href={link} class="external">{title}</a>
      </h4>
      {children}
    </div>
  )
}

export default Enablement
