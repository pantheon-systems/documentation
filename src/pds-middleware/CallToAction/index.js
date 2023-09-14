import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./styles.css"

import { TwoItemLayout } from "@pantheon-systems/pds-toolkit-react"

const propTypes = {
  dark: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  type: PropTypes.string,
}

function CallToAction(props) {
  const { url, title, subTitle, linkText } = props

  return (
    <TwoItemLayout>
      <div className="hero-cta" slot="second-item">
        <h1>{title}</h1>
        <p className="pds-lead-text pds-lead-text--small">{subTitle}</p>
        <Link to={url} className="pds-button pds-button--large">
          {linkText}
        </Link>
      </div>
    </TwoItemLayout>
  )
}

CallToAction.propTypes = propTypes

export default CallToAction
