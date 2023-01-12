import * as React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

export default connectSearchBox(({ refine, ...rest }) => {
  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={preventSubmit} role="search">
      <input
        type="search"
        placeholder="Search Pantheon Documentation"
        aria-label="Search through documentation"
        onChange={(e) => refine(e.target.value)}
        {...rest}
      />
    </form>
  );
});
