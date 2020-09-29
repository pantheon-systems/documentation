import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import Search from "../components/search"

const searchIndices = [{ name: `Pages`, title: `Pages` }]

const SearchPage = () => {
  return (
    <Layout type="search">
      <SEO image={"/assets/images/default-thumb-doc.png"} title="Search" />
      <div style={{ marginTop: "-20px" }} className="container">
        <main className=" doc-content-well" id="docs-main">
          <div className="">
            <h1 className="title">Search Results</h1>
          </div>
          <div className="" style={{ marginBottom: "15px" }}></div>
          <div className=" mb-70">
            <div className="">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 search-results">
                  <Search indices={searchIndices} page="search"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default SearchPage
