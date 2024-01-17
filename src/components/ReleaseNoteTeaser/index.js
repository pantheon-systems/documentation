import React from "react"
import { Link } from "gatsby"
import ReleaseNoteCategories from "../ReleaseNoteCategories/index.js"
import MdxWrapper from "../mdxWrapper.js"
import PublishedDate from "../PublishedDate/index.js"

import "./style.css"

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
          />
        </div>
        <PublishedDate
          dateString={ReleaseNoteData.frontmatter.published_date}
          className="pds-spacing-mar-block-end-m"
        />
        <MdxWrapper mdx={ReleaseNoteData.body} />
      </div>
    </React.Fragment>
  )
}

export default ReleaseNoteTeaser
