import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import showdown from "showdown"

const converter = new showdown.Converter()


class DashboardImages extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allFile(
                filter: {sourceInstanceName: {eq: "partials"}, extension: {regex: "/(md)/"}}
                sort: {fields: relativePath, order: ASC}
                ) {
                edges {
                  node {
                    relativePath
                    childMdx {
                        excerpt
                      }
                   }
                }
            }
            allMdx{
                edges {
                node {
                  fields {
                    slug
                  }
                  fileInfo {
                    relativePath
                    sourceInstanceName
                  }
                  rawBody
                  excerpt
                }
              }
            }
          }
        `}
        render={data => {
          const pages = data.allMdx.edges
          const partials = data.allFile.edges

          return (
            <Layout>
              <h1>Partials Usage</h1>


              {/* Table of docs sorted by Image */}
              <div className="table-responsive">
                <table className="table table-commands table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Partial</th>
                    <th>Used In</th>
                    <th width="30%">Excerpt</th>
                  </tr>
                  </thead>
                  <tbody>
                    {partials.map((partial, i) => {
                      const partialPath = partial.node.relativePath
                      return(
                        <tr key={i}>
                          <td>
                            {partialPath}
                          </td>
                          <td>
                            {pages.filter(page => {
                              const body = page.node.rawBody.toLowerCase()
                              return (
                                body.indexOf(partialPath) >= 0
                              )
                              })
                              .map((page) => {
                                const slug = page.node.fields.slug
                                return (
                                  <>
                                  {page.node.fileInfo.sourceInstanceName}: <Link to={slug.includes('guides/') ? `${slug}` :`/${slug}`} >{slug}</Link><br />
                                  </>
                                )
                              })
                            }
                          </td>
                          <td>{partial.node.childMdx.excerpt}</td>
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

export default DashboardImages

/* .filter(doc => {
                return doc.title.indexOf(search) >= 0
              })*/
