import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ refine, setQuery, ...rest }) => {

  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={preventSubmit} role="search">
      <input
        type="search"
        placeholder="Search Pantheon Documentation"
        aria-label="Search through documentation"
        onChange={(e) => {
          refine(e.target.value);
          setQuery(e.target.value);
        }}
      />
    </form>
  );
}

const Input = connectSearchBox(SearchBox);

export default Input;
