import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"

class ReviewReport extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            categorizedDocs: allMdx(
              filter: {fileAbsolutePath: {regex: "/partials/"}}
              sort: {fields: fileInfo___relativePath, order: ASC}
            ) {
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
                    cms
                  }
                  fileInfo {
                    id
                    relativePath
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
          const [searchcms, setSearchcms] = useState("")
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
                        <th>CMS
                          <div className="input-group">
                            <input
                              type="text"
                              id="command-search-cms"
                              className="form-control"
                              placeholder="Filter"
                              onChange={a => setSearchcms(a.target.value)}
                              value={searchcms}
                            />
                            <div
                              style={{ background: "#fff; cursor:pointer" }}
                              className="input-group-addon"
                              id="clear-filter"
                              onClick={a => setSearchcms("")}
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
                        <th>Excerpt</th>
                        <th>Reviewed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedPages
                        .filter(page => {
                          return page.node.frontmatter.cms
                            ? page.node.frontmatter.cms.filter(
                              cms => cms.indexOf(searchcms) >= 0
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
                              <td>{page.node.fileInfo.relativePath}</td>
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
                                {page.node.frontmatter.cms
                                  ? page.node.frontmatter.cms.map((cms, i) => {
                                      return (
                                        <span key={i}>
                                          {(i ? ", " : "") + cms}
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
                              <td>{page.node.excerpt}</td>
                              <td>{page.node.frontmatter.reviewed}</td>
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
