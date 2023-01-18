import * as React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug} >
      <div>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </div>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
);

export default PageHit;
