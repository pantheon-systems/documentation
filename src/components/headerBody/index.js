import React from "react"

import Contributors from "../contributors"
import Github from "../github"
import Twitter from "../twitter"
import Slack from "../slack"
import ContributorGuest from "../contributorGuest"
import './style.css';

const HeaderBody = ({ title, subtitle, description, slug, contributors, featured, editPath, reviewDate, isoDate }) => {
  const contributor = contributors ? contributors[0] : null;
  const lastReviewed = reviewDate ? "Last Reviewed: " + reviewDate : null;
  return (
    <>
      <header className="buttons">
        {!subtitle &&
        <h1
          style={{ marginBottom: "10px", marginTop: "0px" }}
          className="pio-docs-title"
          id="docs-main"
        >
          {title}
        </h1>}

        {subtitle && <h1>{subtitle}</h1>}

        <p className="article-subhead">
          {description}
        </p>
        <p className="review-date">
          <time dateTime={isoDate} pubdate="pubdate">{lastReviewed}</time>
        </p>
        {!featured && <Contributors contributors={contributors} />}

        <Github
          pageTitle={title}
          path={slug}
          editPath={editPath}
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
