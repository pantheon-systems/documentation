import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
import Accordion from "../components/accordion"
import newGitHubIssueUrl from "new-github-issue-url"

class VideoReport extends React.Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            docsWithVideo: allMdx(
              filter: {
                frontmatter: { changelog: { ne: true }, title: { ne: "" } }
                fileInfo: { childMdx: { rawBody: { regex: "/Youtube/" } } }
              }
            ) {
              edges {
                node {
                  frontmatter {
                    title
                    subtitle
                    cms
                    reviewed
                  }
                  fields {
                    slug
                  }
                  fileInfo {
                    childMdx {
                      rawBody
                    }
                  }
                }
              }
            }
            landingPages: allLandingsYaml(filter: { video_id: { ne: null } }) {
              edges {
                node {
                  path
                  title
                  video_id
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
          const docs = data.docsWithVideo.edges
          const reviewedTertiaryPages = data.docsWithVideo.edges.filter(
            page => {
              return page.node.fields.slug.match(/\/guides(\/[a-z,\-]*){2}/)
            }
          )
          const landings = data.landingPages.edges
          const videoLinkRegex = /src=\\\"(.+?)\\\"/

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
              <h1>Videos</h1>

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

              {/* Table of Docs with Videos */}
              <Accordion
                title="Docs with Videos (filters on Title)"
                id="docsWithVideoTable"
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
                        <td>{docs.length}</td>
                        <td>{docs.length - reviewedTertiaryPages.length}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th width="20%">Title</th>
                        <th width="20%">Path</th>
                        <th width="10%">CMS</th>
                        <th width="5%">Date</th>
                        <th width="10%">Video Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs
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
                              <td>
                                {page.node.frontmatter.title}{" "}
                                {page.node.frontmatter.subtitle
                                  ? ` - ${page.node.frontmatter.subtitle}`
                                  : null}
                              </td>
                              <td>{page.node.fields.slug}</td>
                              <td>{page.node.frontmatter.cms}</td>
                              <td>{page.node.frontmatter.reviewed}</td>
                              <td>
                                <a
                                  href={`https://www.youtube.com/watch?v=${
                                    page.node.fileInfo.childMdx.rawBody.match(
                                      /Youtube\ src=\"(.+?)\"/
                                    )[1]
                                  }`}
                                  target="_blank"
                                >
                                  Video
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </Accordion>
              {/* Table of Landing Pages with Videos */}
              <Accordion
                title="Landing Pages with Videos"
                id="landingsWithVideo"
              >
                <div className="table-responsive">
                  <table className="table table-commands table-bordered table-striped">
                    <thead>
                      <tr>
                        <th> Total Count </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{landings.length}</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th width="30%">Title</th>
                        <th width="20%">Path</th>
                        <th width="10%">Video Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {landings
                        .filter(landing => {
                          return (
                            landing.node.title
                              .toLowerCase()
                              .indexOf(searchTitle.toLowerCase()) >= 0
                          )
                        })
                        .map((landing, i) => {
                          return (
                            <tr key={i}>
                              <td>{landing.node.title}</td>
                              <td>{landing.node.path}</td>
                              <td>
                                <a
                                  href={`https://www.youtube.com/watch?v=${landing.node.video_id}`}
                                  target="_blank"
                                >
                                  Video
                                </a>
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

export default VideoReport
