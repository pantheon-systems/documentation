import React from "react"

const Tab = ({ id, active, children }) => (
  <div role="tabpanel" className={`tab-pane ${active ? "active" : ""}`} id={id}>
    {children}
  </div>
)

export default Tab
