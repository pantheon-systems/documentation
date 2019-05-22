import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Header = ({ data }) => (
  <>
    {data.allReleasesJson.edges.map((release, i, arr) => {
      return (
        <div key={i}>
          <h3>{release.node.tag_name}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: release.node.fields.markdownBody.childMarkdownRemark.html,
            }}
          />
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
                    id
                    html
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)
