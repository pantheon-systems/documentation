import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "../image"

import { Panel } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  url: PropTypes.string,
  image: PropTypes.string,
}

function IntegrationGuideItem(props) {
  const { url, image } = props
  return (
    <Link to={url} className="platform-integration__link">
      <Panel className="platform-integration__container">
        <Image
          alt={image}
          path={`assets/${image}`}
          className="platform-integration__image"
        />
      </Panel>
    </Link>
  )
}

IntegrationGuideItem.propTypes = propTypes

export default IntegrationGuideItem
