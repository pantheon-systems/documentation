import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function TerminusVersion({ text }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            terminus {
              version
            }
          }
        }
      }
    `
  )

  return (
    <h2>
      {text} {site.siteMetadata.terminus.version}
    </h2>
  )
}

export default TerminusVersion
