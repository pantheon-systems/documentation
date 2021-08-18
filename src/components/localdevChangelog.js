import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

const LocaldevChangelog = ({ data }) => (
  <>
    {data.allChangelogYaml.nodes.map((localdev, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore" id={localdev.version}>
            {localdev.version}
          </h3>
          <MDXProvider>
            <div
              className="toc-ignore"
              dangerouslySetInnerHTML={{
                __html:
                  localdev.fields.changelogMarkdown.childrenMarkdownRemark[0]?.html
                    ?.replace(/h3/g, 'h3 class="toc-ignore"')
                    ?.replace(/h2/g, 'h2 class="toc-ignore"'),
              }}
            />
          </MDXProvider>
          <hr />
        </div>
      )
    })}
  </>
)

export default (props) => (
  <StaticQuery
    query={graphql`
      query {
        allChangelogYaml {
          nodes {
            version
            fields {
              changelogMarkdown {
                childrenMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <LocaldevChangelog data={data} {...props} />}
  />
)
