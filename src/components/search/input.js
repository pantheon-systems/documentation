import * as React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

export default connectSearchBox(({ refine, ...rest }) => {
  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={'formElement'} onSubmit={preventSubmit}>
      {/* <SearchIcon /> */}
      <input
        className={'searchInput '}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => refine(e.target.value)}
        {...rest}
      />
    </form>
  );
});
