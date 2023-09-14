import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CTALink } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

function ThreeColumnLinks(props) {
  const { title, links } = props
  return (
    <ul className="pds-cta-link-group">
      {links.map((link, index) => (
        <li key={index}>
          <CTALink linkContent={<Link to={link.url}>{link.text}</Link>} />
        </li>
      ))}
    </ul>
  )
}

ThreeColumnLinks.propTypes = propTypes

export default ThreeColumnLinks
