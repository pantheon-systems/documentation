import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BuildToolsChangelog = ({ data }) => (
  <>
    {data.allBuildToolsReleasesJson.edges.map((buildtools, i) => {
      Object.keys(buildtools).forEach(
        key => data[key] == null && delete data[key]
      )
      return (
        <div key={i}>
          <h3 className="toc-ignore">{buildtools.node.name ? buildtools.node.name : buildtools.node.tag_name}</h3>
          <MDXProvider>
            <MDXRenderer>
              {buildtools.node.fields.markdownBody.childMdx.body.replace(
                /h1/g,
                "h4"
              )}
            </MDXRenderer>
          </MDXProvider>
          <hr />
        </div>
      )
    })}
  </>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allBuildToolsReleasesJson(filter: { body: { ne: null } }) {
          edges {
            node {
              id
              name
              body
              fields {
                markdownBody {
                  childMdx {
                    body
                  }
                }
              }
              tag_name
            }
          }
        }
      }
    `}
    render={data => <BuildToolsChangelog data={data} {...props} />}
  />
)
