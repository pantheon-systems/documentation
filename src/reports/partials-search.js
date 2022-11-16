import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import newGitHubIssueUrl from "new-github-issue-url"

class ReviewReport extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            categorizedDocs: allMdx(filter: {frontmatter: {contenttype: {eq: "partial"}}} sort: {fields: fileInfo___relativePath, order: ASC}) {
              edges {
                node {
                  id
                  excerpt
                  frontmatter {
                    categories
                    reviewed
                    tags
                    type
                    contenttype
                    product
                    integration
                    newcms
                  }
                  fileInfo {
                    childMdx {
                      fileInfo {
                        name
                        relativePath
                      }
                    }
                  }
                  fields {
                    slug
                  }
                }
              }
            }

          }
        `}
        render={data => {
          const [searchProduct, setSearchProduct] = useState("")
          const [searchIntegration, setSearchIntegration] = useState("")
          const [searchnewCms, setSearchnewCms] = useState("")


          const categorizedPages = data.categorizedDocs.edges

          return (
            <Layout>
              <h1>Reports</h1>




              {/*Input form for Product */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-product"
                    className="form-control"
                    placeholder="Filter by Product"
                    onChange={g => setSearchProduct(g.target.value)}
                    value={searchProduct}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={g => setSearchProduct("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>

              {/*Input form for Integration */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-integration"
                    className="form-control"
                    placeholder="Filter by Integration"
                    onChange={h => setSearchIntegration(h.target.value)}
                    value={searchIntegration}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={h => setSearchIntegration("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>

              {/*Input form for CMS */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-newcms"
                    className="form-control"
                    placeholder="Filter by New CMS"
                    onChange={i => setSearchnewCms(i.target.value)}
                    value={searchnewCms}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={i => setSearchnewCms("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>



              {/* Table of Categorized / Tagged Docs */}
              <div>
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Path</th>
                        <th>New CMS</th>
                        <th>Categories</th>
                        <th>Tags</th>
                        <th>Product</th>
                        <th>Integration</th>
                        <th>Reviewed</th>
                        <th>Excerpt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedPages
                        .filter(page => {
                          return page.node.frontmatter.newcms
                            ? page.node.frontmatter.newcms.filter(
                              newcms => newcms.indexOf(searchnewCms) >= 0
                              ).length
                            : page
                        })
                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>{page.node.fileInfo.childMdx.fileInfo.relativePath}</td>
                              <td>
                                {page.node.frontmatter.newcms
                                  ? page.node.frontmatter.newcms.map((newcms, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + newcms}
                                        </span>
                                      )
                                    })
                                  : null}
                              </td>
                              <td>
                                {page.node.frontmatter.categories
                                  ? page.node.frontmatter.categories.map((categories, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + categories}
                                        </span>
                                      )
                                    })
                                  : null}
                              </td>
                              <td>
                                {page.node.frontmatter.tags
                                  ? page.node.frontmatter.tags.map((tag, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + tag}
                                        </span>
                                      )
                                    })
                                  : null}
                              </td>
                              <td>
                                {page.node.frontmatter.product
                                  ? page.node.frontmatter.product.map((product, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + product}
                                        </span>
                                      )
                                    })
                                  : null}
                              </td>
                              <td>
                                {page.node.frontmatter.integration
                                  ? page.node.frontmatter.integration.map((integration, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + integration}
                                        </span>
                                      )
                                    })
                                  : null}
                              </td>
                              <td>{page.node.frontmatter.reviewed}</td>
                              <td>{page.node.excerpt}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>


            </Layout>
          )
        }}
      />
    )
  }
}

export default ReviewReport

/* .filter(doc => {
                return doc.title.indexOf(search) >= 0
              })*/
