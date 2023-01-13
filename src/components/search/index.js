import React, { useState, useEffect, createRef } from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  Configure,
  connectStateResults,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import config from '../../algolia/config';

import { PoweredBy } from './styles';
import Input from './input';
import * as hitComps from './hitComps';
import './style.css';

const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) => (searching && `Searching...`) || (res && res.nbHits === 0 && `No results for '${state.query}'`)
);

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`];
  const detectClickOutside = event =>
    ref && ref.current && !ref.current.contains(event.target) && handler();

  useEffect(() => {
    for (const event of events) document.addEventListener(event, detectClickOutside);
    return () => {
      for (const event of events) document.removeEventListener(event, detectClickOutside);
    };
  });
};

const searchClient = algoliasearch(
  config.search.algoliaAppId,
  config.search.algoliaSearchKey
);

export default function SearchComponent({ indices, collapse }) {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState("false");

  useClickOutside(ref, () => setFocus("false"));
  // const displayResult = query.length > 0 && focus ? 'showResults' : 'hideResults';

  const showStatus = query.length > 0 && focus

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root: <div className='search-container-styles-root'/>, props: { ref } }}
    >
      <Input onFocus={() => setFocus("true")} {...{ collapse, focus }} />
      <div
        style={{ display: showStatus ? 'grid' : 'none' }}
        className='search-container-styles'
        show={query.length > 0 && focus ? 'true' : undefined}
      >
        {indices.map(({ name, hitComp }) => {
          return (
            <Index key={name} indexName={name}>
              <Results />
              <div className="addsearch-container">
                <Hits hitComponent={hitComps[hitComp](() => setFocus("false"))} />
              </div>
            </Index>
          );
        })}
        <PoweredBy />
      </div>
      <Configure hitsPerPage={5} />
    </InstantSearch>
  );
}
