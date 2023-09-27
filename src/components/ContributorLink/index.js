import React from "react"

import { Icon } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const ContributorLink = ({ url, icon }) => {
  return (
    <div className="docs-contributor-link">
      <a aria-hidden="true" href={url} target="_blank">
        <Icon iconName={icon} iconSize="2xl" />
      </a>
    </div>
  )
}

export default ContributorLink
