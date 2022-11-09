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
          /* Construct the constants for our filter terms */

          const categorizedPages = data.categorizedDocs.edges

          return (
            <Layout>
              <h1>Partials</h1>
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
