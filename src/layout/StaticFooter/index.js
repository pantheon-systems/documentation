import React from "react"
import { Link } from "gatsby"

import { Container } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const currentYear = new Date().getFullYear()

const StaticFooter = ({ page }) => (
  <footer className="docs-static-footer">
    <Container className="docs-static-footer__container">
      <div className="docs-static-footer__legal">
        <span className="docs-static-footer__copyright">
          © {currentYear} Pantheon Systems, Inc.
        </span>
        <a href="https://pantheon.io/privacy">Privacy Policy</a>
        <a href="http://pantheon.io/data-subject-request">
          Data Subject Request
        </a>
        <a href="https://pantheon.io/pantheon-cookies?_gl=1*12uc311*_gcl_au*NjU2MzA3MDUzLjE2ODk3ODU1NTI.">
          Cookie Policy
        </a>
        <a href="https://pantheon.io/terms-of-service">Terms of Use</a>
        <a href="https://pantheon.io/accessibility-statement">
          Accessibility Statement
        </a>
      </div>
    </Container>
  </footer>
)

export default StaticFooter
