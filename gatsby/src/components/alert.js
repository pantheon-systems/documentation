import React from "react"

const Alert = ({ title, type, children }) => {
  const alertClass = `alert alert-${type}`
  return (
    <div className={alertClass}>
      <h4 className={type}>{title}</h4>
      {children}
    </div>
  )
}

export default Alert
