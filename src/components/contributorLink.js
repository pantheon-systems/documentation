import React from "react"

const ContributorLink = ({ url, icon }) => {
  return (
    <h2>
      <a aria-hidden="true" href={url} target="_blank">
        <i className={`icon icon-${icon}`} />
      </a>
    </h2>
  )
}

export default ContributorLink
