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
            allDocs: allMdx(
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
          }
        `}
        render={data => {
          const [search, setSearch] = useState("")
          const pages = data.allDocs.edges
          const pagesExcludeMultipage = data.allDocs.edges.filter(page => {
            return page.node.fields.slug.match(/\/guides\/*\/*/)
          })
          console.log("Badly named array: ",pagesExcludeMultipage)
          const oldPages = data.staleDocs.edges
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
                    value={search.toLowerCase()}
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
                  <th> Excluding Multipage Tertiaries </th>
                  </thead>
                  <tr>
                  <td>{pages.length}</td>
                  <td>{pagesExcludeMultipage.length}</td>
                  </tr>                  
                  <tr><hr /></tr>
                  <thead>
                    <tr>
                      <th width="40%">Title</th>
                      <th width="20%">Path</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>

                    {pages
                    .filter(page => {
                      return page.node.frontmatter.title.toLowerCase().indexOf(search) >= 0
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
                      return page.node.frontmatter.title.toLowerCase().indexOf(search) >= 0
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
