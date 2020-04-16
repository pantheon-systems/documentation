import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

{
  /* @TODO Convert to a React Component */
}
const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class dnsProviders extends React.Component {
  render() {
    const data = this.props.data.allMdx
    //console.log("data: ", data) // FOR DEBUGGING
    //console.log ("data.nodes: ", data.nodes) //DEBUGGING
    return (
      <>
        <SEO title="DNS Providers" />
        <Layout>
          <div style={{ marginTop: "-20px" }} className="container">
            <div className="container doc-content-well">
              <div className="row">
                <h1 className="title">DNS Providers</h1>
              </div>
              <div className="row mb-70">
                <ul>
                  {data.nodes.map((page, i) => {
                    return (
                      <>
                        <li key={`index-${i}`}>
                          <Link
                            to={page.fields.slug}
                            title={page.frontmatter.provider}
                          >
                            {page.frontmatter.provider}
                          </Link>
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}

export default dnsProviders

export const pageQuery = graphql`
  {
    allMdx(
      filter: { fileInfo: { absolutePath: { regex: "/.dns-providers./" } } }
      sort: { fields: frontmatter___title, order: ASC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          provider
        }
      }
    }
  }
`
