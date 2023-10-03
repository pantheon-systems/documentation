import React, { Components } from "react"
import Header from "../header"
import Footer from "../footer"

import SearchBar from "../SearchBar"

import { Container, CTASlice } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

// Content for CTA
const primaryCTA = {
  text: "Learn Pantheon",
  url: "https://pantheon.io/learn-pantheon?docs",
}

const secondaryCTA = {
  text: "Office Hours",
  url: "https://pantheon.io/developers/office-hours?docs",
}

const Layout = ({ children, containerWidth, hasCta, pageType = "default" }) => {
  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      <Container width={containerWidth}>
        <SearchBar page={pageType} />
      </Container>
      {children}
      {hasCta && (
        <CTASlice
          backgroundColor="secondary"
          headingText="Got questions? We've got answers!"
          primaryLink={primaryCTA}
          secondaryLink={secondaryCTA}
          className="pre-footer-slice"
        />
      )}
      <Footer className={hasCta ? "with-cta" : null} />
    </div>
  )
}

export default Layout
