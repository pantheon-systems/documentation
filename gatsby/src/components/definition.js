import React from "react"

const Definition = ({ title, children }) => {
  return (
  <>
    <dt>{title}</dt>
    <dd>{children}</dd>
    <br />
  </>
  )
}

export default Definition
