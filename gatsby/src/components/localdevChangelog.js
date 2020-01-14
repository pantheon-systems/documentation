import React from "react"
import { StaticQuery, graphql } from "gatsby"

const LocaldevChangelog = ({ data }) => (
  <>
    {data.localdevYaml.releases.map((localdev, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore">{localdev.version}</h3>
              <div className="toc-ignore" dangerouslySetInnerHTML={{__html: localdev.changelog}} />
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
        localdevYaml {
            releases {
                version
                changelog
            }
        }
      }
    `}
    render={data => <LocaldevChangelog data={data} {...props} />}
  />
)
