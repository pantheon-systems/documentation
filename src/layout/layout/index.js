import React, { Components } from "react"
import Header from "../header"
import Footer from "../footer"
import "./style.css"

const Layout = ({ children, pageType = "default" }) => {
  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
