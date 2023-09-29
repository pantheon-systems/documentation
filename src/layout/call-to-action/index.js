import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CTALink } from "@pantheon-systems/pds-toolkit-react"

import "./styles.css"

const propTypes = {
  dark: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  type: PropTypes.string,
}

function CallToAction(props) {
  const { url, title, type, subTitle, dark } = props
  const linkContent = /https?/.test(url) ? (
    <a href={url}>{title}</a>
  ) : (
    <Link to={url}>{title}</Link>
  )

  return (
    <div className={`call-to-action ${dark && "call-to-action--alt"}`}>
      <div className="pds-overline-text pds-overline-text--sm">{type}</div>
      <CTALink linkContent={linkContent} />
      <p className="call-to-action__subtitle">{subTitle}</p>
    </div>
  )
}

CallToAction.propTypes = propTypes

CallToAction.defaultProps = { type: "doc" }

export default CallToAction
