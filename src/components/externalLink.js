import React from "react"

const ExternalLink = ({ text, link }) => {
  var classes = "external"
  if (
    link == "https://pantheon.io/contact-us" ||
    link == "https://pantheon.io/pantheon-top-edu" ||
    link == "https://pantheon.io/plans/partner-program" ||
    link == "https://pantheon.io/register" ||
    link == "https://pantheon.io/edu" ||
    link == "https://pantheon.io/plans/elite" ||
    link == "https://pantheon.io/essential-developer-training"
  ) {
    classes = "external cta docs-cta"
    link = link + "?docs"
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
