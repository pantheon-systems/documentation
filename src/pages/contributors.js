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

class Contributors extends React.Component {
  render() {
    const {
      data: { allContributorYaml },
    } = this.props
    return (
      <>
        <SEO title="Contributors" />
        <Layout>
          <div style={{ marginTop: "-20px" }} className="container">
            <main className="container doc-content-well" id="doc">
              <div className="row">
                <h1 className="title">Contributors</h1>
              </div>
              <div className="row mb-70">
                <div className="">
                  <div className="flex-panel-group">
                    {allContributorYaml &&
                      allContributorYaml.edges.map(({ node }) => {
                        return (
                          <>
                            {/* @TODO Convert to a React Component */}
                            <div
                              className="preview-flex-panel-item"
                              style={previewFlexPanelItem}
                            >
                              <div className="flex-panel-body">
                                <div className="media row">
                                  <div className="pull-left">
                                    <div className="preview-info__img">
                                      <Link
                                        to={`/contributors/${node.id}`}
                                        title={node.id}
                                      >
                                        <img
                                          alt="Author photo"
                                          typeof="foaf:Image"
                                          src={node.avatar}
                                          width="540"
                                          height="540"
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="media-body__preview">
                                    <div className="media-heading">
                                      <h3 className="toc-ignore">
                                        <Link
                                          to={`/contributors/${node.id}`}
                                          title={node.id}
                                        >
                                          {node.name}
                                        </Link>
                                      </h3>
                                    </div>
                                    <p>{node.bio}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Layout>
      </>
    )
  }
}

export default Contributors

export const pageQuery = graphql`
  {
    allContributorYaml {
      edges {
        node {
          id
          avatar
          name
          bio
        }
      }
    }
  }
`
