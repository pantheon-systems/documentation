import React from "react"
import { Link, graphql } from "gatsby"
import SearchResults from "../components/searchResults"
import Helmet from "react-helmet"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"

class NotFoundPage extends React.Component {

componentDidMount() { //On page load...
    const { pathname } = this.props.location // pull the "location" prop and save it as 'pathname'
    var searchPath = pathname.replace(/\//g, "").replace(/-/g, " ") // define searchPath as pathname by removing the slash and replacing dashes w with spaces
    var searchPath = searchPath.replace("docs", "")// Remove docs from the search path
    window.location.href.toString().includes("addsearch") // If the current page address includes "addsearch"...
      ? null // Do nothing
      : (window.location = ` 404?addsearch=${searchPath}`) // Otherwise, rewrite the URL (which I think inits a reload) to form the UTM parameters Addsearch needs to run a query.
      // Note: This while mess is here not only because of my novice React skills, but because Addsearch would not accept search parameters by any form other than UTM parameters.
      // An Algolia search solution will likely render most of this as removable.

    window.addsearch_settings = { // These are a bunch of key/value pairs addsearch wants. So we set them. See Addsearch's "documentation" for more info.
      display_url: true,
      display_resultscount: false,
      display_sortby: false,
      display_category: true,
      automatic_match_all_query: false,
      number_of_results: 4,
    }

    const script = document.createElement("script") // Loads the Addsearch JS blob from them
    script.setAttribute(
      "src",
      `https://addsearch.com/js/?key=a7b957b7a8f57f4cc544c54f289611c6&type=resultpage`
    )
    script.setAttribute("defer", true)

    document.body.appendChild(script)
  }

  render() {
    const { pathname } = this.props.location
    const {
      data: { homeYaml },
    } = this.props

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
                You can try one of the links below, or go{" "}
                <Link to="/"> back to all docs</Link>?
              </h3>
              <div class="row">
                <div
                  className="col addsearch-container"
                  style={{ width: "45%", float: "left" }}
                >
                  <h2 className="subtitle">Similar Pages</h2>
                  <div id="addsearch-results"></div>
                </div>
                <div className="col" style={{ width: "45%", float: "right" }}>
                  <h2 className="subtitle">{homeYaml.fourohfourlinks.title}</h2>
                  <br />
                  <ul
                    style={{
                      listStyleType: "none",
                      marginTop: "20px",
                      maxWidth: "75%",
                    }}
                  >
                    {homeYaml.fourohfourlinks.links.map(link => {
                      return (
                        <li
                          key={link.url}
                          style={{
                            fontSize: "20px",
                            marginBottom: "20px",
                            paddingBottom: "10px",
                            borderBottom: "1px solid #a4bbc1",
                          }}
                        >
                          <Link to={link.url}>{link.text}</Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  {
    homeYaml {
      fourohfourlinks {
        title
        links {
          text
          url
        }
      }
    }
  }
`
