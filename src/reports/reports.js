import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Accordion from "../components/accordion"
import newGitHubIssueUrl from "new-github-issue-url"

class ReviewReport extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allReviewedDocs: allMdx(
              filter: {
                frontmatter: { 
                    reviewed: { ne: null }
                    draft: {ne: true}
                  }
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
                frontmatter: { 
                  reviewed: { lt: "2020-01-01" }
                  draft: {ne: true}
                }
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
                frontmatter: { 
                  reviewed: { eq: null }
                  title: { ne: "" }
                  draft: {ne: true}
                }
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
            categorizedDocs: allMdx(
              filter: {
                frontmatter: { categories: { glob: "*" }, title: { ne: "" } }
              }
            ) {
              edges {
                node {
                  id
                  frontmatter {
                    title
                    categories
                    reviewed
                    tags
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
          const [searchTitle, setSearch] = useState("")
          //console.log("SearchTitle: ", searchTitle) // For Debugging
          const [searchCategory, setSearchCat] = useState("")
          //console.log("searchCategory: ", searchCategory) // For Debugging
          const [searchTags, setSearchTags] = useState("")
          //console.log("searchTags: ", searchTags) // For Debugging

          /* Construct the constants for each of our Graphql Queries */
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
          const categorizedPages = data.categorizedDocs.edges
          //console.log("categorizedPages: ", categorizedPages) // For Debugging

          /* Construct the GitHub Issue Body */
          const makeNewIssue = page => {
            return newGitHubIssueUrl({
              user: "pantheon-systems",
              repo: "documentation",
              title: "Review " + page.node.frontmatter.title,
              body:
                "[" +
                page.node.frontmatter.title +
                "](https://pantheon.io/docs/" +
                page.node.fields.slug +
                ") " +
                " has been flagged as needing a new review.",
            })
          }

          return (
            <Layout>
              <h1>Reports</h1>

              {/*Input form for Title */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-title"
                    className="form-control"
                    placeholder="Filter by Title"
                    onChange={e => setSearch(e.target.value)}
                    value={searchTitle}
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

              {/*Input form for Category */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-category"
                    className="form-control"
                    placeholder="Filter by Category"
                    onChange={f => setSearchCat(f.target.value)}
                    value={searchCategory}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={e => setSearchCat("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>

              {/*Input form for Tag */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-tag"
                    className="form-control"
                    placeholder="Filter by Tag"
                    onChange={g => setSearchTags(g.target.value)}
                    value={searchTags}
                  />
                  <div
                    style={{ background: "#fff; cursor:pointer" }}
                    className="input-group-addon"
                    id="clear-filter"
                    onClick={e => setSearchTags("")}
                  >
                    <span className="fa fa-times" />
                  </div>
                </div>
              </div>

              {/* Table of Reviewed Docs */}
              <Accordion title="Review Dates (filters on Title)" id="reviewed">
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th> Total Count </th>
                        <th> Excluding Tertiary Pages </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{reviewedPages.length}</td>
                        <td>
                          {reviewedPages.length - reviewedTertiaryPages.length}
                        </td>
                      </tr>
                    </tbody>
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
                              .indexOf(searchTitle.toLowerCase()) >= 0
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

              {/* Table of Docs with Outdated Reviews */}
              <Accordion
                title="Outdated Reviews (Before 2020, filters on Title)"
                id="outdated"
              >
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
                              .indexOf(searchTitle.toLowerCase()) >= 0
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

              {/* Table of Unreviewed Docs */}
              <Accordion
                title="Unreviewed Docs (filters on Title)"
                id="unreviewed"
              >
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th> Total Count </th>
                        <th> Excluding Tertiary Pages </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{unreviewedPages.length}</td>
                        <td>
                          {unreviewedPages.length -
                            unreviewedTertiaryPages.length}
                        </td>
                      </tr>
                    </tbody>
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
                              .indexOf(searchTitle.toLowerCase()) >= 0
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

              {/* Table of Categorized / Tagged Docs */}
              <Accordion
                title="Categorized Docs (filters on Title, Category, Tag)"
                id="categorized"
              >
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th> Total Count of Categorized Pages</th>
                        <th> Categorized and Tagged Pages</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{categorizedPages.length}</td>
                        <td>
                          {
                            categorizedPages.filter(page => {
                              return page.node.frontmatter.tags
                            }).length
                          }
                        </td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th width="5%">Create an Issue</th>
                        <th width="20%">Title</th>
                        <th width="10%">Review Date</th>
                        <th with="20%">Categories</th>
                        <th>Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorizedPages
                        .filter(page => {
                          return (
                            page.node.frontmatter.title
                              .toLowerCase()
                              .indexOf(searchTitle.toLowerCase()) >= 0
                          )
                        })
                        .filter(page => {
                          return page.node.frontmatter.categories.filter(
                            category => category.indexOf(searchCategory) > -1
                          ).length
                        })
                        .filter(page => {
                          return page.node.frontmatter.tags
                            ? page.node.frontmatter.tags.filter(
                                tag => tag.indexOf(searchTags) > -1
                              ).length
                            : page
                        })
                        .map((page, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <a href={makeNewIssue(page)} target="blank">
                                  <span class="glyphicon glyphicon-exclamation-sign"></span>
                                </a>
                              </td>
                              <td>
                                <a href={`/${page.node.fields.slug}`}>
                                  {page.node.frontmatter.title}
                                </a>
                              </td>
                              <td>{page.node.frontmatter.reviewed}</td>
                              <td>
                                {page.node.frontmatter.categories.map(
                                  (category, i) => {
                                    return (
                                      <>
                                        <span key={i}>
                                          {(i ? ", " : "") + category}
                                        </span>
                                      </>
                                    )
                                  }
                                )}
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
