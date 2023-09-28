import React from "react"
import { Link } from "gatsby"

import { Container, PantheonLogo } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const StaticHeader = ({ page }) => (
  <header className="docs-static-header">
    <Container className="docs-static-header__container">
      <div className="docs-static-header__logo">
        <PantheonLogo
          isLink={{ url: "https://pantheon.io", ariaLabel: "Pantheon Home" }}
        />
      </div>
      <div className="docs-static-header__link">
        <Link id="home" to="/" className="pds-button pds-button--navbar">
          Docs Home
        </Link>
      </div>
    </Container>
  </header>
)

export default StaticHeader
