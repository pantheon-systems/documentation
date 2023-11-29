import React from "react"

import { Icon } from "@pantheon-systems/pds-toolkit-react"

const Discourse = ({ pageTitle, path, cms }) => {
  const ifCms = cms ? `&tags=${cms}` : null
  const text = `https://discuss.pantheon.io/new-topic?title=Discussion%20for%20doc:%20${pageTitle}&body=[${pageTitle}](https://docs.pantheon.io/${path})&category=pantheon-platform/documentation/${pageTitle}${ifCms}`
  return (
    <a className="pds-button pds-button--secondary pds-button--sm" href={text}>
      <Icon iconName="discourse" /> Discuss in our Forum
    </a>
  )
}

export default Discourse
