import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../layout/layout"
//import newGitHubIssueUrl from "new-github-issue-url"

/*
This report provides all links to Dashboard pages and features, for quick
reference when they are updates or changed in the product.
*/

// Helper / Builder Functions //

/* This function filters an array to unique entities, without changing the
object type to a set. */
function uniq(a) {
  var seen = {}
  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}

/* This function creates a search field  component. it accepts as arguments
the object and object setter used to represent the data it's filtering on,*/
const SearchField = props => {
  const title = props.title
  const data = props.data
  const dataSetter = props.dataSetter

  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-addon">
          <i className="fa fa-search" />
        </div>
        <input
          type="text"
          id={`command-search-${title}`}
          className="form-control"
          placeholder={`Filter by ${title}`}
          onChange={e => dataSetter(e.target.value)}
          value={data}
        />
        <div
          style={{ background: "#fff; cursor:pointer" }}
          className="input-group-addon"
          id="clear-filter"
          onClick={e => dataSetter("")}
        >
          <span className="fa fa-times" />
        </div>
      </div>
    </div>
  )
}

// Main Page Component //

// Create the React Component as a function
const DashLinks = () => {
  // Data

  /* Create a function to query all pages that include a dashboard link,
  excluding the base domain dashboard.pantheon.io. */
  const queryData = useStaticQuery(graphql`
    query {
      allMdx(filter: { body: { regex: "/dashboard.pantheon.io/[a-z]/" } }) {
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
  `)

  //These objects are shorthand references to data in the query.
  const pages = queryData.allMdx.edges //All Pages
  const tertiaryPages = queryData.allMdx.edges.filter( //All guide sub-pages
    page => {
      return page.node.fields.slug.match(/\/guides(\/[a-z,\-]*){2}/)
    }
  )

  /* These objects contain the data used in the search fields on the page to
  filter the results */
  const [searchTitle, setSearchTitle] = useState("")
  const [searchLinks, setSearchLinks] = useState("")

  // And one for the table data, filtered by the search fields
  const [filteredPages, setFilteredPages] = useState(pages)

  /* This call to the useEffect hook applies the filtering to our results table
  if either search term has a value.*/
  useEffect(() => {
    if (searchTitle || searchLinks) { //If either search field has a value...
      const applyFilter = data => // Define a function to filter the table, using data as a placeholder value,
        data
          .filter(page => { // Filter out objects where the title doesn't match the title search value,
            return (
              page.node.frontmatter.title
                .toLowerCase()
                .indexOf(searchTitle.toLowerCase()) >= 0
            )
          })
          .filter(page => { // Filter objects where the body doesn't contain the specified link string,
            return (
              page.node.body.toLowerCase().indexOf(searchLinks.toLowerCase()) >= 0
            )
          })
      setFilteredPages(applyFilter(pages)) //Apply the filter function to the pages,
    } else {
      setFilteredPages(pages) // Return the full set if no search terms are applied.
    }
  }, [pages, searchTitle, searchLinks, setFilteredPages]) //If the data in any of these objects changes, the useEffect hook is called.

  /* Component to construct the table body by mapping on the pages data, after
  it's been filtered by the search terms*/
  const ResultsTable = () => {
    return (
      //Construct a table body
      <tbody>
        {filteredPages.map((page, i) => { // Map over each page and,
          return (
            <tr key={i}> {/*Create a table row*/}
              <td>{page.node.frontmatter.title || "Partial File"}</td> {/*Provide the page title, or specify a partial file if there isn't one*/}
              <td>{page.node.fields.slug}</td> {/*Provide the path to the page*/}
              <td>
                {uniq( //Return only one unique instance where,
                  page.node.body //in the body
                    .match(RegExp(/dashboard.pantheon.io\/[a-z-\/]+/g)) // there's a reference to a dashboard page,
                    .map((link, i) => link + "\n") // and list each one on a new line.
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  // Render
  return (
    <Layout>
      <SearchField
        title="Doc Title"
        data={searchTitle}
        dataSetter={setSearchTitle}
        key="search1"
      />
      <SearchField
        title="Dashboard Link"
        data={searchLinks}
        dataSetter={setSearchLinks}
        key="search2"
      />
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
          <ResultsTable />
        </table>
      </div>
    </Layout>
  )
}

export default DashLinks
