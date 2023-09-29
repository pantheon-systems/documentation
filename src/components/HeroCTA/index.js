import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "./styles.css"

import { FlexContainer, Icon } from "@pantheon-systems/pds-toolkit-react"

const propTypes = {
  dark: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  type: PropTypes.string,
}

function HeroCTA(props) {
  const { url, title, subTitle, linkText, imageSrc } = props

  return (
    <FlexContainer spacing="wide" className="hero-cta">
      <div className="hero-cta-image" slot="first-item">
        <StaticImage
          src="https://cdn.bfldr.com/MEM5087K/as/2ckv698krjq73jqvpwqsf4kp/WEB-2x1-ProductDetailFrontEndSites-Hero_v2-1166x792_docs-site?auto=webp&format=png"
          alt=""
          placeholder="blurred"
        />
      </div>
      <div className="hero-cta-text" slot="second-item">
        <h1>{title}</h1>
        <p className="pds-lead-text pds-lead-text--small">{subTitle}</p>
        <Link
          to={url}
          className="pds-button pds-button--large pds-spacing-mar-block-start-m"
        >
          {linkText}
          <Icon iconName="arrowRight" iconSize="lg" />
        </Link>
      </div>
    </FlexContainer>
  )
}

HeroCTA.propTypes = propTypes

export default HeroCTA
