import React from "react"
import Footer from "../layout/footer"
import StaticHeader from "../layout/StaticHeader"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"

class NotFoundPage extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <>
        <StaticHeader />
        <div>
          <SEO
            title="404"
            description="Zoinks! You've hit a URL that doesn't exist. Let's try a search:"
          />
          <div>
            <main id="docs-main">
              <div className="pds-spacing-mar-block-end-6xl">
                <h1>Sorry, there's no page at that URL.</h1>
                <img
                  className="notfound"
                  style={{ maxWidth: 400 }}
                  src={SVG404}
                />
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default NotFoundPage
