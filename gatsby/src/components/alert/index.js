import React from "react"
import './style.css';

const Alert = ({ title, type, icon, children }) => {
  const alertClass = `alert alert-${type}`
  const glyphiconClass = `glyphicon glyphicon-${icon}`
  return (
    <>
    <div className={alertClass}>
      <h4 className={type}>
      <span className={glyphiconClass}></span>&nbsp;
      {title}
      </h4>
      {children}
    </div>
    </>
  )
}

export default Alert
