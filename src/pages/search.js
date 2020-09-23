import { createRef, default as React, useState } from "react"
import { Link } from "gatsby"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Hits } from "react-instantsearch-dom"
import StyledSearchResult from "../components/search/styled-search-result"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import queryString from "query-string"
const searchIndices = [{ name: `Pages`, title: `Pages` }]
var parsed = [{
  q: ''
}]
const Hit = ({ hit }) => <Link to={hit.slug}>{hit.title}</Link>;

class Search extends React.Component {
  componentDidMount() {
    const { pathname } = this.props.location
    var parsed = queryString.parse(location.search)
    //console.log("parsed location: ", parsed) //For Debugging
    }
  render() {
    const query = parsed.q
    //console.log("query: ", query) //For Debugging
    const searchClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    
    return (
      <Layout search={query} searchPage={true}>
        <SEO image={"/assets/images/default-thumb-doc.png"} title="Search" />
        <div style={{ marginTop: "-20px" }} className="container">
          <main className=" doc-content-well" id="docs-main">
            <div className="">
              <h1 className="title">Search Results</h1>
            </div>
            <div className="" style={{ marginBottom: "15px" }}></div>
            <div className=" mb-70">
              <div className="">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 search-results">
                    <InstantSearch
                      searchClient={searchClient}
                      indexName={searchIndices[0].name}
                      onSearchStateChange={({ query }) => setQuery(query)}
                      
                    >
                      <StyledSearchResult
                        show={true}
                        indices={searchIndices}
                      />
                    </InstantSearch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    )
  }
}

export default Search
