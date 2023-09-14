import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CTALink } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

function LinksList(props) {
  const { links } = props

  // Process links into list items.
  const processedLinks = links.map((link, index) => (
    <li key={index}>
      <CTALink linkContent={<Link to={link.url}>{link.text}</Link>} />
    </li>
  ))

  return (
    <ul className="links-list pds-spacing-mar-block-end-6xl">
      {processedLinks}
    </ul>
  )
}

LinksList.propTypes = propTypes

export default LinksList
