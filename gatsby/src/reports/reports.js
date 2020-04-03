import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../layout/layout"
import Accordion from "../components/accordion"

class ReviewReport extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allReviewedDocs: allMdx(
              filter: {
                frontmatter: { reviewed: { ne: null } }
                fields: { slug: { regex: "/^((?!changelog).)*$/" } }
              }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    reviewed
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            staleDocs: allMdx(
              filter: {
                frontmatter: { reviewed: { lt: "2020-01-01" } }
                fields: { slug: { regex: "/^((?!changelog).)*$/" } }
              }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    reviewed
                  }
                  fields {
                    slug
                  }
                }
              }
            }
            unreviewedDocs: allMdx(
              filter: {
                frontmatter: { reviewed: { eq: null }, title: { ne: "" } }
                fields: { slug: { regex: "/^((?!changelog).)*$/" } }
              }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    reviewed
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
          const [search, setSearch] = useState("")
          const reviewedPages = data.allReviewedDocs.edges
          const reviewedTertiaryPages = data.allReviewedDocs.edges.filter(
            page => {
              return page.node.fields.slug.match(/\/guides(\/[a-z,\-]*){2}/)
            }
          )
          //console.log("Tertiary Pages: ", tertiaryPages) // For debugging
          const oldPages = data.staleDocs.edges
          const unreviewedPages = data.unreviewedDocs.edges
          //console.log("Unreviewed Docs Array: ", unreviewedPages) // For debugging
          const unreviewedTertiaryPages = data.unreviewedDocs.edges.filter(
            page => {
              return page.node.fields.slug.match(/\/guides(\/[a-z,\-]*){2}/)
            }
          )
          //console.log("Unreviewed Tertiary Pages: ", unreviewedTertiaryPages) // For debugging
          return (
            <Layout>
              <h1>Reports</h1>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search"
                    className="form-control"
                    placeholder="Filter by Title"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={e => setSearch("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>

              <Accordion title="Review Dates" id="reviewed">
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <th> Total Count </th>
                      <th> Excluding Tertiary Pages </th>
                    </thead>
                    <tr>
                      <td>{reviewedPages.length}</td>
                      <td>
                        {reviewedPages.length - reviewedTertiaryPages.length}
                      </td>
                    </tr>
                    <br />
                    <thead>
                      <tr>
                        <th width="40%">Title</th>
                        <th width="20%">Path</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviewedPages
                        .filter(page => {
                          return (
                            page.node.frontmatter.title
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) >= 0
                          )
                        })
                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>{page.node.frontmatter.title}</td>
                              <td>{page.node.fields.slug}</td>
                              <td>{page.node.frontmatter.reviewed}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </Accordion>

              <Accordion title="Outdated Reviews (Before 2020)" id="outdated">
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th width="40%">Title</th>
                        <th width="20%">Path</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {oldPages
                        .filter(page => {
                          return (
                            page.node.frontmatter.title
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) >= 0
                          )
                        })
                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>{page.node.frontmatter.title}</td>
                              <td>{page.node.fields.slug}</td>
                              <td>{page.node.frontmatter.reviewed}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </Accordion>

              <Accordion title="Unreviewed Docs" id="unreviewed">
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <th> Total Count </th>
                      <th> Excluding Tertiary Pages </th>
                    </thead>
                    <tr>
                      <td>{unreviewedPages.length}</td>
                      <td>
                        {unreviewedPages.length -
                          unreviewedTertiaryPages.length}
                      </td>
                    </tr>
                    <br />
                    <thead>
                      <tr>
                        <th width="40%">Title</th>
                        <th width="20%">Path</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unreviewedPages
                        .filter(page => {
                          return (
                            page.node.frontmatter.title
                              .toLowerCase()
                              .indexOf(search.toLowerCase()) >= 0
                          )
                        })
                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>{page.node.frontmatter.title}</td>
                              <td>{page.node.fields.slug}</td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </Accordion>
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
