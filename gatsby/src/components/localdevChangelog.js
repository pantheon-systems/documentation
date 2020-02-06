import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

const LocaldevChangelog = ({ data }) => (
  <>
    {data.localdevYaml.releases.map((localdev, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore" id={localdev.version}>{localdev.version}</h3>
          <MDXProvider>

              <div className="toc-ignore" dangerouslySetInnerHTML={{__html: localdev.changelog.replace(/h3/g, 'h3 class=\"toc-ignore\"')}} />

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
