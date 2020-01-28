import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const DrushChangelog = ({ data }) => (
  <>
    {data.allDrushChangelogJson.edges.map((drush, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore">{drush.node.name}</h3>
          <MDXProvider>
            <MDXRenderer>
                {drush.node.fields.markdownBody.childMdx.body}
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
        allDrushChangelogJson(
            sort: {fields: id, order: DESC}
            ) {
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
    render={data => <DrushChangelog data={data} {...props} />}
  />
)
