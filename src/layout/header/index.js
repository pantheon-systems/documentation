import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

import AddSearch from "../../components/addSearch"
 import { Navbar } from '@pantheon-systems/pds-toolkit-react'

import "./style.css"




const Header = ({ data, page }) => (
  <header> <Navbar/></header>

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
