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
              filter: {
                frontmatter: { 
                  title: { ne: "" }
                }
                fields: { slug: { regex: "/^((?!changelog).)*$/" } }
              }
              sort: {fields: fileInfo___relativePath, order: ASC}
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    categories
                    cms
                    reviewed
                    tags
                    type
                    permalink
                    subtitle
                    contenttype
                    product
                    integration
                    newcms
                    description
                    permalink
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
              <h1>All Files</h1>
                <div>
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Subtitle</th>
                        <th>Description</th>
                        <th>CMS</th>
                        <th>New CMS</th>
                        <th>Categories</th>
                        <th>Tags</th>
                        <th>Type</th>
                        <th>Product</th>
                        <th>Integration</th>
                        <th>Review Date</th>
                        <th>Path</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedPages

                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <Link to={page.node.frontmatter.permalink ? page.node.frontmatter.permalink.replace("docs", "").replace(":basename", page.node.fileInfo.childMdx.fileInfo.name) : `/${page.node.fields.slug}`}>
                                {page.node.frontmatter.title}{" "}
                                </Link>
                              </td>
                              <td>{page.node.frontmatter.cms ? page.node.frontmatter.subtitle : null}</td>
                              <td>{page.node.frontmatter.cms ? page.node.frontmatter.description : null}</td>
                              <td>{page.node.frontmatter.cms ? page.node.frontmatter.cms : null}</td>
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
                              <td>{page.node.frontmatter.contenttype}</td>
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
                              <td>{page.node.fileInfo.childMdx.fileInfo.relativePath}</td>
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
