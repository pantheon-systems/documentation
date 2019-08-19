import React from "react"

const Icon = ({ icon, text }) => {
  return (
    <strong>
      <span className={`glyphicons glyphicons-${icon}`} /> {text}
    </strong>
  )
}
export default Icon
