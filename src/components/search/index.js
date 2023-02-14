import React, { useState, useEffect, createRef } from 'react';
import {
  Index,
  Hits,
  Configure,
  connectStateResults,
} from 'react-instantsearch-dom';
import propTypes from "prop-types";
import { PoweredBy } from './styles';
import Input from './input';
import hitComps from './hitComps';
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

const SearchComponent = ({ indices, collapse, isSearchPage }) => {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState("false");

  useClickOutside(ref, () => setFocus("false"));

  const showStatus = query.length > 0 && focus

  const setQueryState = (value) => setQuery(value)

  return (
    <div>
      <Input onFocus={() => setFocus("true")} {...{ collapse, focus }} setQuery={setQueryState} />
      <div
        style={{ display: showStatus && !isSearchPage ? 'grid' : 'none' }}
        className='search-container-styles'
        show={query.length > 0 && focus ? 'true' : undefined}
      >
        {indices.map(({ name, hitComp }) => {
          return (
            <Index key={name} indexName={name}>
              <Results />
              <div className="addsearch-container">
                <Hits hitComponent={hitComps} />
              </div>
            </Index>
          );
        })}
        <PoweredBy />
      </div>
      <Configure hitsPerPage={10} />
    </div>
  );
}

SearchComponent.propTypes = {
  indices: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      title: propTypes.string,
      hitComp: propTypes.string,
    })
  ),
  collapse: propTypes.string,
  isSearchPage: propTypes.bool,
};

export default SearchComponent;
