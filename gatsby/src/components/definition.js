import React from "react"

const Definition = ({ name, children }) => (
  <>
    <dt>{name}</dt><dd markdown="1">{children}</dd>
  </>
)

export default Definition
