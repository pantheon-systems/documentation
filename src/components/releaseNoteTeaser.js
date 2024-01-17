import React from "react"
import { Link } from "gatsby"
import ReleaseNoteCategories from "../components/releaseNoteCategories"
import MdxWrapper from "../components/mdxWrapper.js"
import PublishedDate from "./PublishedDate"

const ReleaseNoteTeaser = ({ ReleaseNoteData }) => {
  if (!ReleaseNoteData) {
    return null
  }

  return (
    <React.Fragment key={ReleaseNoteData.id}>
      <div>
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
        <PublishedDate
          dateString={ReleaseNoteData.frontmatter.published_date}
        />
        <MdxWrapper mdx={ReleaseNoteData.body} />
      </div>
    </React.Fragment>
  )
}

export default ReleaseNoteTeaser
