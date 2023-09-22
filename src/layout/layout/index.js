import React, { Components } from "react"
import Header from "../header"
import Footer from "../footer"

import SearchBar from "../SearchBar"

import { Container } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Layout = ({ children, containerWidth, pageType = "default" }) => {
  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      <Container width={containerWidth}>
        <SearchBar page={pageType} />
      </Container>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
