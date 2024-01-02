import React from "react"
import { graphql, Link } from "gatsby"
import ReleaseNoteCategories from "../components/releaseNoteCategories"
import MdxWrapper from "../components/mdxWrapper.js"








const ReleaseNoteTeaser = ({ key, ReleaseNoteData }) => {


  console.log("ReleaseNoteData", ReleaseNoteData);
  if (!ReleaseNoteData) {
    return null
  }

  return (

    <div>
      <Link
        to={`/${ReleaseNoteData.fields.slug}`}
        className="individual-changelog-link"
      >
        <h2 id={ReleaseNoteData.fields.slug}>
          {ReleaseNoteData.frontmatter.title}
        </h2>
      </Link>
    <ReleaseNoteCategories categories={ReleaseNoteData.frontmatter.categories} />


      Todo, transform to date format<br></br>
      {ReleaseNoteData.frontmatter.published_date}

      <MdxWrapper mdx={ReleaseNoteData.body} />

    </div>
  )
}

export default ReleaseNoteTeaser
