import React from "react"
import { Link } from "gatsby"
import ReleaseNoteCategories from "../ReleaseNoteCategories/index.js"
import MdxWrapper from "../mdxWrapper.js"
import PublishedDate from "../PublishedDate/index.js"
import {
  headline2,
  headline3,
  headline4,
} from "../releaseHeadlines"

import "./style.css"

// Change the heading levels when release notes are displayed as a list so that the the headings don't conflict with the release note headings.
const customShortcodes = {
  h1: headline2,
  h2: headline3,
  h3: headline4,
}

const ReleaseNoteTeaser = ({ ReleaseNoteData, className }) => {
  if (!ReleaseNoteData) {
    return null
  }

  return (
    <React.Fragment key={ReleaseNoteData.id}>
      <div
        className={["docs-release-note-teaser", className]
          .join(" ")
          .trim()
          .replace(/\s+/g, " ")}
      >
        <div className="docs-release-note-teaser__header pds-spacing-mar-block-end-xs">
          <Link
            to={`/${ReleaseNoteData.fields.slug}`}
            className="individual-changelog-link"
          >
            <h2 id={ReleaseNoteData.fields.slug}>
              {ReleaseNoteData.frontmatter.title}
            </h2>
          </Link>
          <ReleaseNoteCategories
            categories={ReleaseNoteData.frontmatter.categories}
            isLinkable={false}
          />
        </div>
        <PublishedDate
          dateString={ReleaseNoteData.frontmatter.published_date}
          className="pds-spacing-mar-block-end-m"
        />
        <MdxWrapper mdx={ReleaseNoteData.body} customShortcodes={customShortcodes} />
      </div>
    </React.Fragment>
  )
}

export default ReleaseNoteTeaser
