import algoliasearch from "algoliasearch/lite"
import { createRef, default as React, useState } from "react"
import ReactDOM from 'react-dom'
import { navigate } from "@reach/router"
import { InstantSearch } from "react-instantsearch-dom"
import { ThemeProvider } from "styled-components"
import StyledSearchBox from "./styled-search-box"
import StyledSearchResult from "./styled-search-result"
import StyledSearchRoot from "./styled-search-root"
import useClickOutside from "./use-click-outside"
import qs from "qs"

const DEBOUNCE_TIME = 300;

const theme = {
  foreground: "#050505",
  background: "white",
  faded: "#888",
}
/*
var search = window.location.search
var location = window.location

const createURL = state => `?${qs.stringify(state)}`;
const searchStateToUrl = ({ location }, searchState) =>
  searchState ? `${location.pathname}${createURL(searchState)}` : '';

console.log("location.search: ", location.search)

const urlToSearchState = ( location ) => qs.parse(search.slice(1));*/

const Search = (searchIndices, searchState, setSearchState) => {
  //console.log("searchQuery in search component: ", searchQuery) //For Debugging
  console.log("Not broken yet...")
  
  const rootRef = createRef()
  //const [searchState, setSearchState] = useState(urlToSearchState(location));
  //const [debouncedSetState, setDebouncedSetState] = useState(null);

  /*const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        navigate(
          null,
          {updatedSearchState},
          searchStateToUrl(updatedSearchState),
        );
      }, DEBOUNCE_TIME)
    );



    setSearchState(updatedSearchState);
  }*/

  //const [hasFocus, setFocus] = useState(false)
 /*/ const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )*/
  
  useClickOutside(rootRef, () => setFocus(false))
  return (
    <ThemeProvider theme={theme}>
      <StyledSearchRoot ref={rootRef}>
          <StyledSearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} onSubmit={() => navigate("search", searchState)}/>
          <StyledSearchResult
            show={searchState.query && searchState.query.length > 0 && hasFocus && page !== "search"}
            header
          />
          <StyledSearchResult
            show={page === "search"}
          />
      </StyledSearchRoot>
    </ThemeProvider>
  )
}

export default Search