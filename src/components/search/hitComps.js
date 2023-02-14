import * as React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import propTypes from "prop-types";

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

PageHit.propTypes = {
  hit: propTypes.shape({
    title: propTypes.string.isRequired,
    slug: propTypes.string.isRequired, 
  }),
};

export default PageHit;
