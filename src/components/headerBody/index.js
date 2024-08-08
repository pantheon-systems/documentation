import React from "react"

import Contributors from "../contributors"
import Github from "../github"
import Slack from "../slack"
import ContributorGuest from "../contributorGuest"
import { StatusBadge } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const HeaderBody = ({
  title,
  subtitle,
  description,
  slug,
  contributors,
  featured,
  editPath,
  reviewDate
}) => {
  const contributor = contributors ? contributors[0] : null
  const lastReviewed = reviewDate ? "Last Reviewed: " + reviewDate : null
  return (
    <>
      <header className="doc-content-header">
        {lastReviewed && (
          <StatusBadge
            hasStatusIndicator={false}
            label={lastReviewed}
            color="transparent"
            className="pds-spacing-mar-block-end-m"
          />
        )}
        {/* <p className="review-date">
          <time dateTime={isoDate} pubdate="pubdate">
            {lastReviewed}
          </time>
        </p> */}
        {!subtitle && <h1 className="docs-title">{title}</h1>}

        {subtitle && <h1>{subtitle}</h1>}

        <p className="pds-lead-text pds-lead-text--sm pds-spacing-mar-block-end-xl">
          {description}
        </p>

        {!featured && <Contributors contributors={contributors} />}
        <div className="doc-content-header__actions">
          <div className="doc-content-header__discuss">
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
