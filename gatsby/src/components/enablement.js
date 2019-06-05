import React from "react"

const Enablement = ({ title, link, children }) => {
  return (
    <div className="enablement">
      <h4 className="enablement">
        <a href={link} class="external">{title}</a>
      </h4>
      {children}
    </div>
  )
}

export default Enablement
