import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Accordion from "../components/accordion"
import newGitHubIssueUrl from "new-github-issue-url"

class DashboardLinks extends React.Component {
  render() {
    function uniq(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

    return (
      <StaticQuery
        query={graphql`
          query {
            allMdx(filter: {body: {regex: "/dashboard.pantheon.io\\/[a-z]/"}}) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                  body
                }
              }
            }
          }
        `}
        render={data => {
          /* Construct the constants for our filter terms */
          const [searchTitle, setSearch] = useState("")
          //console.log("SearchTitle: ", searchTitle) // For Debugging
          const [searchLinks, setSearchLinks] = useState("")
          //console.log("searchLinks: ", searchLinks) // For Debugging

          /* Construct the constants for each of our Graphql Queries */
          const pages = data.allMdx.edges
          //console.log(pages)

          const tertiaryPages = data.allMdx.edges.filter(
            page => {
              return page.node.fields.slug.match(/\/guides(\/[a-z,\-]*){2}/)
            }
          )
          //console.log(tertiaryPages)


          const makeNewIssue = (page) => {
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
              <h1>Dashboard Links</h1>

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

              {/*Input form for Dashboard */}
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-addon">
                    <i className="fa fa-search" />
                  </div>
                  <input
                    type="text"
                    id="command-search-category"
                    className="form-control"
                    placeholder="Filter by Dashboard Link"
                    onChange={f => setSearchLinks(f.target.value)}
                    value={searchLinks}
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



              {/* Table of Docs */}
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
                      <td>{pages.length}</td>
                      <td>{pages.length - tertiaryPages.length}</td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th width="40%">Title</th>
                      <th width="20%">Path</th>
                      <th>Dashboard Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages
                      .filter(page => {
                        return (
                          page.node.frontmatter.title
                            .toLowerCase()
                            .indexOf(searchTitle.toLowerCase()) >= 0
                        )
                      })
                      .filter(page => {
                        return (
                          page.node.body.toLowerCase()
                          .indexOf(searchLinks.toLowerCase()) >= 0
                        )
                      })
                      .map((page, i) => {
                        return (
                          <tr key={i}>
                            <td>{page.node.frontmatter.title || 'Partial File'}</td>
                            <td>{page.node.fields.slug}</td>
                            <td>{uniq(page.node.body.match(RegExp(/dashboard.pantheon.io\/[a-z-\/]+/g)).map((link, i) => link + '\n'))}</td>
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

export default DashboardLinks

/* .filter(doc => {
                return doc.title.indexOf(search) >= 0
              })*/
