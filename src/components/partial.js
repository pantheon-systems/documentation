import React from "react"
import { StaticQuery, graphql } from "gatsby"
import MdxWrapper from "../components/mdxWrapper"

const Partial = props => (
  <StaticQuery
    query={graphql`
      query {
        allDocs: allMdx(
          filter: { fileAbsolutePath: { regex: "/partials/" }, parent: {} }
          sort: { fields: fileAbsolutePath }
        ) {
          edges {
            node {
              body
              parent {
                ... on File {
                  relativePath
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const mdx = data.allDocs.edges.find(edge => {
        return edge.node.parent.relativePath === props.file
      })

      if (!mdx) {
        return null
      }

      return (
        <>
          <MdxWrapper mdx={mdx.node.body} />
        </>
      )
    }}
  />
)

export default Partial
