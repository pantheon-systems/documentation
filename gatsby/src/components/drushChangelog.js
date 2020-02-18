import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const DrushChangelog = ({ data }) => (
  <>
    {data.allDrushReleasesJson.edges.map((drush, i) => {
      Object.keys(drush).forEach((key) => (data[key] == null) && delete data[key]);
      return (
        <div key={i}>
          <h3 className="toc-ignore">{drush.node.name}</h3>
          <MDXProvider>
            <MDXRenderer>
                {drush.node.fields.markdownBody.childMdx.body.replace(/h1/g, 'h4')}
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
        allDrushReleasesJson(
          filter: {body: {ne: null}}
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
