import React from "react"
import { Link } from "gatsby"

import { Container, PantheonLogo } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const StaticHeader = ({ page }) => (
  <header className="docs-static-header">
    <Container>
      <PantheonLogo />
    </Container>
  </header>
)

export default StaticHeader
