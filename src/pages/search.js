import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"



class Search extends React.Component {
  componentDidMount() { //On page load...
/*
    window.addsearch_settings = {
      "search_widget": {
        "placeholder": "Search Pantheon Docs",
        "show_search_suggestions": true,
        "search_suggestion_position": "left",
        "default_sortby": "relevance",
        "display_date": false,
        "display_meta_description": true,
        "display_result_image": false,
        "link_target": "_blank",
        "hide_logo": false,
        "direction": "ltr",
        "api_throttle_time": 2000,
        "automatic_filter_results_by_site_language": false,
        "analytics_enabled": true
      }
    }

  const script = document.createElement("script") // Loads the Addsearch JS blob from them
  script.setAttribute(
    "src",
    `https://cdn.addsearch.com/v5/addsearch-ui.min.js?key=a7b957b7a8f57f4cc544c54f289611c6&id=search_widget`
  )
  script.setAttribute("defer", true)

  document.body.appendChild(script)
*/
    const script2 = document.createElement("script") // Loads the Addsearch JS blob from them
    script2.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-js-client@0.8/dist/addsearch-js-client.min.js`
    )
    //script2.setAttribute("defer", true)
    document.body.appendChild(script2)


    const script3 = document.createElement("script") // Loads the Addsearch JS blob from them
    script3.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.js`
    )
   // script3.setAttribute("defer", true)
    script3.onload = () => this.addSearchStuff();
   document.body.appendChild(script3)


    const link = document.createElement("script") // Loads the Addsearch JS blob from them
    link.setAttribute(
      "href",
      `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.css`
    )
    link.setAttribute("rel", 'stylesheet')

    //alert('mount up');
    document.body.appendChild(link)






}
 addSearchStuff() {
  alert('add it');
   var client = new AddSearchClient('a7b957b7a8f57f4cc544c54f289611c6');

   // Search UI instance
   var searchui = new AddSearchUI(client);

   // Add components
   searchui.searchField({
     containerId: 'searchfield',
     placeholder: 'Keyword..',
     button: 'Search',
     searchAsYouType: true
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
        <div style={{ marginTop: "-20px" }} className="container">
          <main className=" doc-content-well" id="docs-main">
            <div className="">
              <h1 className="title">Search Results:asdfasdf</h1>
            </div>
            <div className="" style={{ marginBottom: "15px" }}></div>
            <div className=" mb-70">
              <div className="">
                <div className="container">
                  <div className="row" id="results">
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
