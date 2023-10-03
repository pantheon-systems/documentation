import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CTALink } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

function TwoColumnLinks(props) {
  const { links } = props

  // Process links into list items.
  const processedLinks = links.map((link, index) => (
    <li key={index}>
      <CTALink linkContent={<Link to={link.url}>{link.text}</Link>} />
    </li>
  ))

  // Divide total number by three and break into columns.
  const linksPerColumn = Math.ceil(links.length / 2)

  const columns = processedLinks.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / linksPerColumn)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  const processedGroups = columns.map((group, index) => (
    <span
      className={`pds-cta-link-group group-${
        index + 1
      } pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6`}
    >
      {columns[index]}
    </span>
  ))

  return (
    <ul className="two-column-links pds-grid pds-grid--wide pds-spacing-mar-block-start-xl pds-spacing-mar-block-end-6xl">
      {processedGroups}
    </ul>
  )
}

TwoColumnLinks.propTypes = propTypes

export default TwoColumnLinks
