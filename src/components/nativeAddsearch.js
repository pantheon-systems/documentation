import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import AddSearchClient from "addsearch-js-client"

const Search = props => {
  //console.log("props: ", props) // For Debugging

  // Init empty array of Search Reults
  const [searchResults, setSearchResults] = useState([])
  const searchClient = new AddSearchClient("a7b957b7a8f57f4cc544c54f289611c6")
  function searchCallback(res) {
    //console.log("res: ", res) // For Debugging
    setSearchResults(res.hits)
    //console.log("searchResults", searchResults) // For Debugging
  }
  useEffect(() => {
    // Function to map the results of the search to the searchResults array,
    searchClient.search(props.query, searchCallback)
  }, [])
  const resultCount = props.count ? props.count : 10

  return (
    <>
      <ul
        style={{
          listStyleType: "none",
          marginTop: "20px",
          maxWidth: "75%",
        }}
      >
        {searchResults.slice(0, resultCount).map(hit => {
          //console.log("inside mapping: ", searchResults) //For Debugging
          return (
            <li
              key={hit.id}
              style={{
                fontSize: "20px",
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #a4bbc1",
              }}
            >
              <Link to={hit.url.replace("https://pantheon.io/docs/", "")}>
                {hit.title.replace(" | Pantheon Docs", "")}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Search
