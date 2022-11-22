import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"

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
                    contenttype
                    integration
                    newcms
                    product
                    reviewed
                    tags
                    type
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
          const [searchnewCms, setSearchnewCms] = useState("")
          const [searchCategories, setSearchCategories] = useState("")
          const [searchTags, setSearchTags] = useState("")
          const [searchProduct, setSearchProduct] = useState("")
          const [searchIntegration, setSearchIntegration] = useState("")

          const categorizedPages = data.categorizedDocs.edges

          return (
            <Layout>
              <div style={{ padding: "20px" }}>
              <h1>Partials</h1>
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Path</th>
                        <th>CMS
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-newcms"
                              className="form-control"
                              placeholder="Filter"
                              onChange={a => setSearchnewCms(a.target.value)}
                              value={searchnewCms}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={a => setSearchnewCms("")}
                            >
                              <span className="fa fa-times" />
                            </div>
                          </div>
                        </th>
                        <th>Categories
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-categories"
                              className="form-control"
                              placeholder="Filter"
                              onChange={b => setSearchCategories(b.target.value)}
                              value={searchCategories}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={b => setSearchCategories("")}
                            >
                              <span className="fa fa-times" />
                            </div>
                          </div>
                        </th>
                        <th>Tags
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-tags"
                              className="form-control"
                              placeholder="Filter"
                              onChange={c => setSearchTags(c.target.value)}
                              value={searchTags}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={c => setSearchTags("")}
                            >
                              <span className="fa fa-times" />
                            </div>
                          </div>
                        </th>
                        <th>Product
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-product"
                              className="form-control"
                              placeholder="Filter"
                              onChange={d => setSearchProduct(d.target.value)}
                              value={searchProduct}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={d => setSearchProduct("")}
                            >
                              <span className="fa fa-times" />
                            </div>
                          </div>
                        </th>
                        <th>Integration
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-integration"
                              className="form-control"
                              placeholder="Filter"
                              onChange={e => setSearchIntegration(e.target.value)}
                              value={searchIntegration}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={e => setSearchIntegration("")}
                            >
                              <span className="fa fa-times" />
                            </div>
                          </div>
                        </th>
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
                        .filter(page => {
                          return page.node.frontmatter.categories
                            ? page.node.frontmatter.categories.filter(
                              categories => categories.indexOf(searchCategories) >= 0
                              ).length
                            : page
                        })
                        .filter(page => {
                          return page.node.frontmatter.tags
                            ? page.node.frontmatter.tags.filter(
                              tags => tags.indexOf(searchTags) >= 0
                              ).length
                            : page
                        })
                        .filter(page => {
                          return page.node.frontmatter.product
                            ? page.node.frontmatter.product.filter(
                              product => product.indexOf(searchProduct) >= 0
                              ).length
                            : page
                        })
                        .filter(page => {
                          return page.node.frontmatter.integration
                            ? page.node.frontmatter.integration.filter(
                              integration => integration.indexOf(searchIntegration) >= 0
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
