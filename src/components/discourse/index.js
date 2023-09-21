import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faDiscourse } from "@fortawesome/free-brands-svg-icons"

const Discourse = ({ pageTitle, path, cms }) => {
  const ifCms = cms ? `&tags=${cms}` : null
  const text = `https://discuss.pantheon.io/new-topic?title=Discussion%20for%20doc:%20${pageTitle}&body=[${pageTitle}](https://docs.pantheon.io/${path})&category=pantheon-platform/documentation/${pageTitle}${ifCms}`
  return (
    <a
      className="pds-button pds-button--secondary pds-button--small"
      href={text}
    >
      <FontAwesomeIcon icon={faDiscourse} size="1x" className="fa" /> Discuss in
      our Forum
    </a>
  )
}

export default Discourse
