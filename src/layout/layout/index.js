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

const Layout = ({
  children,
  containerWidth,
  excludeSearch,
  hasCta,
  footerBorder,
  pageType = "default",
}) => {
  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      {!excludeSearch && (
        <Container width={containerWidth}>
          <SearchBar page={pageType} />
        </Container>
      )}
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
      <Footer className={footerBorder ? "with-border" : null} />
    </div>
  )
}

export default Layout
