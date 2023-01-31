import React from "react"
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import config from '../../algolia/config';
import Header from "../header"
import Footer from "../footer"
import './style.css'

const searchClient = algoliasearch(
  config.search.algoliaAppId,
  config.search.algoliaSearchKey
);

const Layout = (props) => {
  const pageType = props.type ? props.type : "default"

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={config.search.indexName}
      onSearchStateChange={() => {}}
    >
      <div className="pantheon-docs">
        <Header page={pageType} />
        {props.children}
        <Footer />
      </div>
    </InstantSearch>
  )
}

export default Layout
