import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import AddSearch from "../../components/addSearch"
import { Navbar } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const documentationMenuItems = [
  {
    isNode: true,
    nodeContent: (
      <Link id="get-started" to="/get-started">
        Get Started
      </Link>
    ),
  },
]

const navbarChildren = [
  <a
    key="2"
    slot="items-right"
    className="pds-button pds-button--navbar"
    href="https://dashboard.pantheon.io/#support"
    target="_blank"
  >
    Support
  </a>,
  <a
    key="3"
    slot="items-right"
    className="pds-button pds-button--brand-secondary"
    href="https://dashboard.pantheon.io"
    target="_blank"
  >
    Log in
  </a>,
  <a
    key="4"
    slot="items-right"
    className="pds-button pds-button--brand"
    href="https://pantheon.io/register"
    target="_blank"
  >
    Get free account
  </a>,
]

const Header = () => (
  <header>
    <Navbar ariaLabel="Main navigation" children={navbarChildren} />
  </header>
)

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo-pantheon-logotype.png" }) {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    `}
    render={(data) => <Header data={data} {...props} />}
  />
)
