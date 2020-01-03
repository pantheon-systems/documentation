import React, { Components} from "react"
import Header from "../header"
import Footer from "../footer"
import './style.css'

const Layout = ({ children }) => {
  return (
    <div className="pantheon-docs">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
