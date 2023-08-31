import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"
import { Link, graphql } from "gatsby"


class NotFoundPage extends React.Component {

  componentDidMount() { //On page load...
    const { pathname } = this.props.location // pull the "location" prop and save it as 'pathname'
    var searchPath = pathname.replace(/\//g, " ").replace(/-/g, " ") // define searchPath as pathname by removing the slash and replacing dashes w with spaces

    window.location.href.toString().includes("search") // If the current page address includes "addsearch"...
    ? null // Do nothing
    : window.location = `/404?search=${searchPath}` // Otherwise, rewrite the URL (which I think inits a reload) to form the UTM parameters Addsearch needs to run a query.

    const script1 = document.createElement("script") // Loads the Addsearch JS blob from them
    script1.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-js-client@0.8/dist/addsearch-js-client.min.js`
    )
    //script2.setAttribute("defer", true)
    document.body.appendChild(script1)

    const script2 = document.createElement("script") // Loads the Addsearch JS blob from them
    script2.setAttribute(
      "src",
      `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.js`
    )
    // script3.setAttribute("defer", true)
    script2.onload = () => this.addSearchStuff();
    document.body.appendChild(script2)

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
    //alert('add it');
    var client = new AddSearchClient('a7b957b7a8f57f4cc544c54f289611c6');

    var searchui_conf = {
      searchResultsPageUrl: '/search?search=${searchPath}'
    }

    // Search UI instance
    var searchui = new AddSearchUI(client, searchui_conf);

    // Add components
    searchui.searchField({
      searchAsYouType: true,
      selectorToBind: '.addsearch',
    });
    searchui.searchResults({
      containerId: 'addsearch-results'
    });
    searchui.pagination({
      containerId: 'addsearch-pagination'
    });

    // All components added. Start
    searchui.start();

  }

  render() {
    return (
      <Layout type="404">
        <SEO
          title="404"
          description="Zoinks! You've hit a URL that doesn't exist. Let's try a search:"
          />
        <div style={{ marginTop: "-20px" }} className="container">
          <main className=" doc-content-well" id="docs-main">
            <div className="mb-70">
              <img className="notfound" src={SVG404} />
              <h2>Sorry, there's no page at that URL.</h2>
              <h3>
                You can try the search above, or go{" "}
                <Link to="/"> back to all docs</Link>?
              </h3>
              <div id="addsearch-results"></div>
              <div id="addsearch-pagination"></div>
            </div>
          </main>
        </div>
      </Layout>
    )
  }

}
export default NotFoundPage
