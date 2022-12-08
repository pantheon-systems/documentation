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
                    newcms
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
          /* Construct the constants for our filter terms */

          const categorizedPages = data.categorizedDocs.edges

          return (
            <Layout>
              <div style={{ padding: "20px" }}>
              <h1>Partials</h1>
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Path</th>
                        <th>Categories</th>
                        <th>CMS</th>
                        <th>Product</th>
                        <th>Integration</th>
                        <th>Tags</th>
                        <th>Excerpt</th>
                        <th>Reviewed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedPages

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
