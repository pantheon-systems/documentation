import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faSlack } from "@fortawesome/free-brands-svg-icons"

const Slack = () => {
  return (
    <a
      className="pds-button pds-button--secondary pds-button--small"
      href="https://slackin.pantheon.io/"
    >
      <FontAwesomeIcon icon={faSlack} size="1x" className="fa" /> Discuss in
      Slack
    </a>
  )
}

export default Slack
