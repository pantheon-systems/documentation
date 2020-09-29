import { React, useState } from "react"
import { location, globalHistory } from "@reach/router"
import "prismjs/themes/prism-okaidia.css" // custom typefaces
import "prismjs/plugins/line-numbers/prism-line-numbers.css" // Code block line numbering
import './src/styles/codeBlocks.css' // Code block shell prompt
// require("/source/docs/assets/js/main.js") // Previous version scripts and styles
import "tocbot/dist/tocbot.css" // // TOC generator
import "tocbot/dist/tocbot.min.js"
import "./src/styles/global.scss" // Global CSS styles
import qs from "qs" // To pull query parameters from the URI

//Segment
export const onRouteUpdate = () => {
  window.locations = window.locations || [document.referrer];
  locations.push(window.location.href);
  window.previousPath = locations[locations.length - 2];
  window.analytics && window.analytics.page({
    url: window.location.href,
    referrer: window.previousPath,
    title: document.title
  })
  //console.log("Title: ", document.title) //For debugging
}

// wrap all pages with InstantSearch
export const wrapRootElement = ({element}, location, history) => {

  // This block reads and writes to the URL to get search queries
  const createURL = state => `?${qs.stringify(state)}`
  const searchStateToUrl = ({ location }, searchState) => {
    searchState ? `${location.pathname}${createURL(searchState)}` : ''
  }
  console.log("Window.Location.Search.slice(1): ", window.location.search.slice(1))
  const search = window.location.search
  const urlToSearchState = (location) => {
    qs.parse(window.location.search.slice(1));
    }
    
  const [searchState, setSearchState] = useState(urlToSearchState(location))
  const [debouncedSetState, setDebouncedSetState] = useState(null);
    const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
        setTimeout(() => {
          history.pushState(
            updatedSearchState,
            null,
            searchStateToUrl(updatedSearchState)
          );
        }, DEBOUNCE_TIME)
      );

    setSearchState(updatedSearchState);
  }
  //End Block

  const searchClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
  
  
  const searchIndices = React.createContext([{ name: `Pages`, title: `Pages` }])
console.log("Window.Location.Search.slice(1): ", window.location.search.slice(1))
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
      createUrl={createURL}
    >
      {element}
    </InstantSearch>
  )
}