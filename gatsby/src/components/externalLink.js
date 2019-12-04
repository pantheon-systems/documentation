import React from "react"

const ExternalLink = ({ text, link }) => {
  return (
    <a
      target="_blank"
      rel="nofollow noopener external"
      href={link}
      title={text}
      className="external"
    >
      {text}
    </a>
  )
}

export default ExternalLink
