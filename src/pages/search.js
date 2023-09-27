import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"

import { Container } from "@pantheon-systems/pds-toolkit-react"

class Search extends React.Component {
  componentDidMount() { //On page load...
    const addsearch_js_client = document.createElement("script") // Loads the Addsearch JS blob from them
    addsearch_js_client.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-js-client@0.8/dist/addsearch-js-client.min.js`
    )
    addsearch_js_client.setAttribute("defer", true)
    document.body.appendChild(addsearch_js_client)


    const addsearch_search_ui = document.createElement("script") // Loads the Addsearch JS blob from them
    addsearch_search_ui.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.js`
    )
    addsearch_search_ui.setAttribute("defer", true)
    addsearch_search_ui.onload = () => this.addSearchStuff();
    document.body.appendChild(addsearch_search_ui)


    const addsearch_styles = document.createElement("script") // Loads the Addsearch JS blob from them
    addsearch_styles.setAttribute(
      "href",
      `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.css`
    )
    addsearch_styles.setAttribute("defer", true)
    addsearch_styles.setAttribute("rel", 'stylesheet')

    document.body.appendChild(addsearch_styles)


}
 addSearchStuff() {
   var client = new AddSearchClient('a7b957b7a8f57f4cc544c54f289611c6');


   var searchui_conf = {
     searchResultsPageUrl: 'search'
   }
   // Search UI instance
   var searchui = new AddSearchUI(client, searchui_conf);

   // Add components
   searchui.searchField({
     containerId: 'search',
     searchAsYouType: true,
     selectorToBind: '.pds-input-field__input',
     ignoreSearchResultsPageUrl: true,
   });
   searchui.searchResults({
     containerId: 'results'
   });
   searchui.pagination({
     containerId: 'pagination'
   });

   // All components added. Start
   searchui.start();

 }

  render() {
    return (
      <Layout>
        <SEO image={"/images/assets/default-thumb-doc.png"} title="Search" />
        <Container width="wide">
          <main className=" doc-content-well" id="docs-main">
            <div className="">
              <h1 className="title">Search Results:</h1>
            </div>
            <div className="" style={{ marginBottom: "15px" }}></div>
            <div className=" mb-70">
              <div className="">
                <div className="container">
                  <div className="row" id="search-field">
                  </div>
                  <div className="row addsearch" id="results">

                  </div>
                  <div className="row" id="pagination">
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Container>
      </Layout>
    )
  }
}


export default Search
