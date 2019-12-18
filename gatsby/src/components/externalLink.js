import React from "react"

const ExternalLink = ({ text, link }) => {
  var classes = "external"
  if (link === "https://pantheon.io/contact-us" ||
      link === "https://pantheon.io/pantheon-top-edu" ||
      link === "https://pantheon.io/agencies/partner-program" ||
      link === "https://pantheon.io/register" )
    {
      classes = "external cta docs-cta"
    }

  return (
    <a
      target="_blank"
      rel="nofollow noopener external"
      href={link}
      title={text}
      className={classes}
    >
      {text}
    </a>
  )
}

export default ExternalLink
