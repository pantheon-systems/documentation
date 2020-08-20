/*
import React from "react"

const Slack = () => {
  return (
    <iframe
      title="Slack"
      src="https://slackin.pantheon.io/iframe"
      className="__slackin"
      style={{
        borderWidth: 0,
        width: "200px",
        height: "20px",
        visibility: "visible",
        marginLeft: 3,
      }}
    />
  )
}

export default Slack
*/

import React from "react"
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faSlack,
} from '@fortawesome/fontawesome-free-brands'


const Slack = () => {
  return (
        <a 
        className="btn btn-slack fa"
        href="https://slackin.pantheon.io/"
      > <FontAwesomeIcon icon={faSlack} size="1x" className="fa" /> Slack</a>
  )
}

export default Slack

