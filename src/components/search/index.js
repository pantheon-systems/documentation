import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./styled-search-box"
import StyledSearchResult from "./styled-search-result"
import StyledSearchRoot from "./styled-search-root"
import useClickOutside from "./use-click-outside"

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}

export default function Search({ indices, page, searchQuery}) {
  //console.log("searchQuery in search component: ", searchQuery) //For Debugging
  const rootRef = createRef()
  const [searchState, setSearchState] = useState({
    query: searchQuery,
    page: "1",
  })
  const [hasFocus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(rootRef, () => setFocus(false))
  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          searchState={searchState}
          onSearchStateChange={setSearchState}
        >
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus}/>
          <StyledSearchResult
            show={searchState.query && searchState.query.length > 0 && hasFocus && page !== "search"}
            indices={indices}
            header
          />
          <StyledSearchResult
            show={page === "search"}
            indices={indices}
          />
        </InstantSearch>
      </StyledSearchRoot>
    </ThemeProvider>
  )
}