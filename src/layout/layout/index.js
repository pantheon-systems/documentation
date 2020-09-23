import React, { Components} from "react"
import Header from "../header"
import Footer from "../footer"
import './style.css'

const Layout = (props) => {
  const pageType = props.type ? props.type : "default"
  //console.log("query from layout props: ", props.search) //For Debugging
  return (
    <div className="pantheon-docs">
      <Header page={pageType} search={props.search}/>
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
