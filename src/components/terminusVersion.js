import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function TerminusVersion({ text }) {
  const { terminusReleasesJson } = useStaticQuery(
    graphql`
      query {
        terminusReleasesJson {
          tag_name
        }
      }
    `
  )

  return (
    <h2>
      {text} {terminusReleasesJson.tag_name}
    </h2>
  )
}

export default TerminusVersion
