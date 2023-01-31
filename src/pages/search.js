import React from "react"
import {
  Configure,
  Hits,
  Pagination,
  Highlight,
  Snippet
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import Layout from "../layout/layout"
import SEO from "../layout/seo"

const Search = () => {
  return (
    <Layout>
      <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
      <div style={{ marginTop: "-20px" }} className="container">
        <main className=" doc-content-well" id="docs-main">
          <h1 className="title">Search Results</h1>
          <div className=" mb-70">
            <Configure hitsPerPage={10} />
            <div>
              <Hits hitComponent={Hit} />
              <div>
                <Pagination />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

function Hit({ hit }) {
  return (
    <div>
      <Link to={hit.slug} >
        <div>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </div>
      </Link>
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  );
}

export default Search
