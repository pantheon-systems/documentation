import React from "react"
import { Link } from "gatsby"

import {
  Navbar,
  NavMenu,
} from "@pantheon-systems/pds-toolkit-react"

import { MOBILE_MENU_BREAKPOINT } from '../../vars/responsive'

import "./style.css"

// Links for NavMenu component.
const mainNavigationLinks = [
  {
    label: "Documentation",
    links: [
      {
        linkContent: (
          <Link id="home" to="/">
            Docs Home
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="get-started" to="/get-started">
            Get Started
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="develop" to="/develop">
            Develop
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="go-live" to="/go-live">
            Go Live
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="platform" to="/platform">
            Explore Platform Architecture
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="automate" to="/automate">
            Automate & Integrate
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="performance" to="/performance">
            Optimize Performance
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="manage" to="/manage">
            Manage Teams & Organizations
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="troubleshoot" to="/troubleshoot">
            Troubleshoot
          </Link>
        ),
      },
      {
        isSeparator: true,
      },
      {
        linkContent: (
          <Link id="release-notes" to="/release-notes">
            Release Notes (Changelog)
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="Glossary" to="/glossary">
            Glossary
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="certification" to="/certification">
            Certification Program
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="terminus" to="/terminus">
            Terminus Guide
          </Link>
        ),
      },
    ],
  },
  {
    linkContent: (
      <a href="https://dashboard.pantheon.io/#support" target="_blank">
        Support
      </a>
    ),
  },
]


const Header = ({ page }) => (
  <>
    <a id="skip-to-main" className="pds-skiplink" href="#docs-main">
      Skip to main content
    </a>

    <Navbar logoLinkContent={<a href="https://pantheon.io" target="_blank" rel="nofollow">Pantheon Home</a>}>
      <NavMenu
        slot="items-left"
        ariaLabel="Main Navigation"
        menuItems={mainNavigationLinks}
        mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
      />
      <div slot="items-right" className="pds-button-group">
        <a
          className="pds-button pds-button--brand-secondary"
          href="https://dashboard.pantheon.io"
          target="_blank"
        >
          Log in
        </a>
        <a
          className="pds-button pds-button--brand"
          href="https://pantheon.io/register"
          target="_blank"
        >
          Get free account
        </a>
      </div>
    </Navbar>
  </>
)

export default Header
