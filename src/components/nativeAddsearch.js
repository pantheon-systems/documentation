import React, { useEffect } from "react"
import AddSearchClient from "addsearch-js-client"

const Search = props => {
  //console.log("props: ", props) // For Debugging

  // Init empty array of Search Reults
  const searchResults = []

  // Function to map the results of the search to the searchResults array,
  function searchCallback(res) {
    //console.log("res: ", res) // For Debugging
    res.hits.map(hit => {
      searchResults.push(hit)
    })
    //console.log("searchResults", searchResults) // For Debugging
  }
  const searchClient = new AddSearchClient("a7b957b7a8f57f4cc544c54f289611c6")
  //useEffect(() => {
    searchClient.search(props.query, searchCallback)
  //}, [searchResults])
  return (
    <>
      <ul>
        {console.log("searchResults inside return: ", searchResults)}

        {searchResults.map(hit => {
          console.log("inside mapping: ", searchResults)
          return <li key={hit.id}>
          {hit.title}
          </li>
        })}
      </ul>
    </>
  )
}

export default Search
