import React, { Fragment } from "react"
import {
  Hits,
  Pagination,
  Highlight,
  Snippet,
  connectSortBy,
  connectStateResults,
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import propTypes from "prop-types";
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import format from "date-fns/format"
import "./style.css"

const Hit = ({ hit }) => {
  const pantheonDocsUrl = "https://pantheon.io/docs";

  return (
    <div>
      <Link to={hit.slug} >
        <div>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </div>
      </Link>
      <p>
        <span className="results-item-url">{pantheonDocsUrl}{hit.slug}</span>
      </p>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
      { hit.reviewed_timestamp ? <p>{format(new Date(hit.reviewed_timestamp), 'PP')}</p> : null }
    </div>
  );
};

Hit.propTypes = {
  hit: propTypes.shape({
    title: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
  }),
};


const sortableIndices = [
  { value: process.env.GATSBY_ALGOLIA_INDEX_NAME, label: 'Relevance' },
  { value: process.env.GATSBY_ALGOLIA_INDEX_NAME_SORTED, label: 'Date' },
]


const Results = connectStateResults(({ searchResults }) => {
  if(!searchResults) {
    return null
  }

  const { nbHits } = searchResults

  return (
    <p className="results-container">{nbHits} results</p>
  )
})

const SortBy = connectSortBy(({ items, refine }) => {
  return (
    <div className="sort-by-container">
      <Results />
      <span className="sort-by-controls">
        Sort by:
        <ul className="sort-by-controls-buttonlist">
          {items.map(index => {
            return (
              <li className="sort-by-control" key={index.label}>
                {
                  index.isRefined
                    ? <span className="sort-by-button sort-by-button--selected">{index.label}</span>
                    : <a className="sort-by-button" onClick={(e) => {
                      e.preventDefault()
                      refine(index.value)
                    }}>{index.label}</a>
                }
              </li>
            )
          })}
        </ul>
      </span>
    </div>
  )
})


const Search = () => {

  return (
    <Layout>
      <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
      <div style={{ marginTop: "-20px" }} className="container">
        <main className=" doc-content-well" id="docs-main">
          <h1 className="title">Search Results</h1>
          <div className="search-page-hits-container">
            <SortBy
              items={sortableIndices}
              defaultRefinement={process.env.GATSBY_ALGOLIA_INDEX_NAME}
            />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </main>
      </div>
    </Layout>
  )
};

export default Search;
