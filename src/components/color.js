import React from "react"

const Color = ({ color, children }) => {
  const colorStyle = `color:${color}`
  return <span style={colorStyle}>{children}</span>
}

export default Color
