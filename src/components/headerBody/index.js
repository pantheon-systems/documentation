import React from "react"

import Contributors from "../contributors"
import Github from "../github"
import Twitter from "../twitter"
import Slack from "../slack"
import Discourse from "../discourse"
import ContributorGuest from "../contributorGuest"

import { Badge } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const HeaderBody = ({
  title,
  subtitle,
  description,
  slug,
  contributors,
  featured,
  editPath,
  reviewDate,
  isoDate,
  cms,
}) => {
  const contributor = contributors ? contributors[0] : null
  const lastReviewed = reviewDate ? "Last Reviewed: " + reviewDate : null
  return (
    <>
      <header className="doc-content-header">
        {lastReviewed && (
          <Badge
            hasStatusType={false}
            label={lastReviewed}
            className="pds-spacing-mar-block-end-m"
          />
        )}
        {/* <p className="review-date">
          <time dateTime={isoDate} pubdate="pubdate">
            {lastReviewed}
          </time>
        </p> */}
        {!subtitle && (
          <h1 className="docs-title" id="docs-main">
            {title}
          </h1>
        )}

        {subtitle && <h1>{subtitle}</h1>}

        <p className="pds-lead-text pds-lead-text--small pds-spacing-mar-block-end-xl">
          {description}
        </p>

        {!featured && <Contributors contributors={contributors} />}
        <div className="doc-content-header__actions">
          <div className="doc-content-header__discuss">
            <Discourse pageTitle={title} path={slug} cms={cms} />
            <Slack />
          </div>
          <Github
            className="doc-content-header__github"
            pageTitle={title}
            path={slug}
            editPath={editPath}
          />
        </div>

        {featured && <ContributorGuest contributor={contributor} />}
        <br />
      </header>
    </>
  )
}

export default HeaderBody
