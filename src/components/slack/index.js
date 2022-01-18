import React from "react"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faSlack } from "@fortawesome/free-brands-svg-icons"

const Slack = () => {
  return (
    <a className="btn btn-slack fa" href="https://slackin.pantheon.io/">
      {" "}
      <FontAwesomeIcon icon={faSlack} size="1x" className="fa" /> Discuss in
      Slack
    </a>
  )
}

export default Slack
