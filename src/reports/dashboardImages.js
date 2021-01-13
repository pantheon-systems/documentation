import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Accordion from "../components/accordion"
import newGitHubIssueUrl from "new-github-issue-url"
import Image from "../layout/image"
import showdown from "showdown"

const converter = new showdown.Converter()

const CollapImage = (props) => {
  const [hideImg, setHideImg] = useState(false)

  const handleImgClick = () => {
    if (!hideImg){
      setHideImg(true)
    } else {setHideImg(false)}
  }
  return (
    <>
      <Image
        style={ hideImg ?
          {
            height: "20px"
          } : null
        }
        onClick={handleImgClick}
        {...props}
      />
      <br /><hr/>
    </>
  )
}

class DashboardImages extends React.Component {
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
            allMdx(filter: {rawBody: {regex: "/dashboard\\/[\\S]+.(jpg|png)/"}}) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                  rawBody
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
          console.log(pages)

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
              <h1>Dashboard Images</h1>

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
                      <th width="40%">Image</th>
                      <th width="20%">Page</th>
                      <th>Page Path</th>
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
                          page.node.rawBody.toLowerCase()
                          .indexOf(searchLinks.toLowerCase()) >= 0
                        )
                      })
                      .map((page, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              {page.node.rawBody
                                .match(RegExp(/dashboard\/[\S]+.(jpg|png)/g))
                                .map((link, i) => {
                                  return (
                                    <>
                                      <CollapImage
                                        path={link}
                                        alt={link}
                                      />
                                    </>
                                  )
                                }
                              )}
                            </td>
                            <td>{page.node.frontmatter.title || 'Partial File'}</td>
                            <td>{page.node.fields.slug}</td>
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
