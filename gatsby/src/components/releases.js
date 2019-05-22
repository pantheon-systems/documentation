import React from "react"
import RehypeReact from "rehype-react"
import { StaticQuery, graphql } from "gatsby"

import { headline1, headline2, headline3 } from "./releaseHeadlines"

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components: {
    h1: headline1,
    h2: headline2,
    h3: headline3,
  },
}).Compiler

const Releases = ({ data }) => (
  <>
    {data.allReleasesJson.edges.map((release, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore">{release.node.tag_name}</h3>
          <div>
            {renderAst(
              release.node.fields.markdownBody.childMarkdownRemark.htmlAst
            )}
          </div>
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
        allReleasesJson(
          sort: { fields: [tag_name], order: DESC }
          filter: { fields: { original_id: { gt: 5224487 } } }
        ) {
          edges {
            node {
              id
              tag_name
              body
              fields {
                markdownBody {
                  childMarkdownRemark {
                    htmlAst
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Releases data={data} {...props} />}
  />
)
