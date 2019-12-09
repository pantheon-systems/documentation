import React, { Components} from "react"
import Header from "../header"
import Footer from "../footer"
import './style.css'

const Layout = (props) => {
  const pageType = props.type ? props.type : "default"
  return (
    <div className="pantheon-docs">
      <Header page={pageType}/>
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
