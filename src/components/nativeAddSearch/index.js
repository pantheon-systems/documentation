import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import AddSearchClient from "addsearch-js-client"
import './style.css'

const Search = props => {
  //console.log("props: ", props) // For Debugging

  // Init default match threshold
  const matchLimit = 5

  // Init empty array of Search Reults
  const [searchResults, setSearchResults] = useState([])
  // Init AddSearch API Client
  const searchClient = new AddSearchClient("a7b957b7a8f57f4cc544c54f289611c6")

  // Function to map the results of the search to the searchResults array,
  function searchCallback(res) {
    //console.log("res: ", res) // For Debugging
    setSearchResults(res.hits)
    //console.log("searchResults", searchResults) // For Debugging
  }
  useEffect(() => {
    // Initiate the search.
    searchClient.search(props.query, searchCallback)
  }, [])

  // Display 10 results unless overridden
  const resultCount = props.count ? props.count : 10

  return (
    <>
      <section className="resultList">
        {searchResults.slice(0, resultCount).map(hit => {
          // console.log("results before score filtering: ", searchResults) //For Debugging
          if (hit.score > (props.score ? props.score : matchLimit)) {
            console.log("Hit: ", hit) // For Debugging
          return (
            <article
              key={hit.id}
              className="resultItem"
            >
              <header className="resultTitle" >
                <Link to={`/${hit.url.replace("https://pantheon.io/docs/", "")}`}>
                  {hit.title.replace(" | Pantheon Docs", "")}
                </Link>
              </header>
              <main>{hit.meta_description}</main>
              <small>
                {hit.custom_fields.type ? hit.custom_fields.type.toUpperCase() : "DOC"}
                &nbsp; | &nbsp;
                {Array.isArray(hit.meta_categories) ? hit.meta_categories[0].charAt(0).toUpperCase() +  hit.meta_categories[0].slice(1 ): hit.meta_categories}
                </small>
            </article>
          )}
        })}
      </section>
    </>
  )
}

export default Search
