import React from "react"
import ExternalLink from "./externalLink"

const Callout = ({ type, children, title, link }) => {
  return (
    <div className={`alert alert-${type}`}>
      <h4 className={type}>
        <ExternalLink text={title} link={link} />
      </h4>
      {children}
    </div>
  )
}

export default Callout
