import React from "react"
import SearchResults from "../components/searchResults"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

class Search extends React.Component {
  render() {
    return (
      <Layout>
        <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
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
                      <SearchResults />
                      <script src="https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6&type=resultpage"></script>
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
}

export default Search
