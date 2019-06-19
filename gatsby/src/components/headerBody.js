import React from "react"

import Contributors from "../components/contributors"
import Github from "../components/github"
import Twitter from "../components/twitter"
import Slack from "../components/slack"
import ContributorGuest from "../components/contributorGuest"

const HeaderBody = ({ title, subtitle, description, slug, contributors, featured }) => {
  const contributor = contributors ? contributors[0] : null;
  return (
    <>
      <header className="buttons">
        {!subtitle &&
        <h1
          style={{ marginBottom: "10px", marginTop: "0px" }}
          className="pio-docs-title"
        >
          {title}
        </h1>}

        {subtitle && <h1>{subtitle}</h1>}

        <p className="article-subhead">
          {description}
        </p>

        {!featured && <Contributors contributors={contributors} />}

        <Github
          pageTitle={title}
          path={slug}
        />
        <Twitter
          pageTitle={title}
          path={slug}
        />
        <Slack />

        {featured && <ContributorGuest contributor={contributor} />}
      </header>
    </>
  )
}

export default HeaderBody
