import React, { useState, useEffect, createRef } from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  Configure,
  connectStateResults,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import config from '../../../config';

import Input from './input';
import * as hitComps from './hitComps';

const Root = () => <div></div>

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

export default function SearchComponent({ indices, collapse, hitsAsGrid }) {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState(false);

  useClickOutside(ref, () => setFocus(false));
  const displayResult = query.length > 0 && focus ? 'showResults' : 'hideResults';

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <div
        className={'hitWrapper ' + displayResult}
        show={query.length > 0 && focus}
        asGrid={hitsAsGrid}
      >
        {indices.map(({ name, title, hitComp, type }) => {
          return (
            <Index key={name} indexName={name}>
              <Results />
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Index>
          );
        })}
        {/* <PoweredBy /> */}
      </div>
      <Configure hitsPerPage={5} />
    </InstantSearch>
  );
}
