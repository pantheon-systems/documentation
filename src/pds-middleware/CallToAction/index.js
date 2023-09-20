import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./styles.css"

import { FlexContainer, Icon } from "@pantheon-systems/pds-toolkit-react"

const propTypes = {
  dark: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  type: PropTypes.string,
}

function CallToAction(props) {
  const { url, title, subTitle, linkText, imageSrc } = props

  return (
    <FlexContainer spacing="wide" className="hero-cta">
      <div className="hero-cta-image" slot="first-item">
        <img src={imageSrc} alt="" />
      </div>
      <div className="hero-cta-text" slot="second-item">
        <h1>{title}</h1>
        <p className="pds-lead-text pds-lead-text--small">{subTitle}</p>
        <Link
          to={url}
          className="pds-button pds-button--large pds-spacing-mar-block-start-m"
        >
          {linkText}
          <Icon iconName="arrowRight" iconSize="large" />
        </Link>
      </div>
    </FlexContainer>
  )
}

CallToAction.propTypes = propTypes

export default CallToAction
