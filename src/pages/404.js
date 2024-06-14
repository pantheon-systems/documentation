import React from "react"
import StaticFooter from "../layout/StaticFooter"
import StaticHeader from "../layout/StaticHeader"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"

import { Container } from "@pantheon-systems/pds-toolkit-react"

class NotFoundPage extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <>
        <StaticHeader />
        <Container className="pds-spacing-pad-block-start-2xl pds-spacing-pad-block-end-4xl">
          <SEO
            title="404"
            description="Zoinks! You've hit a URL that doesn't exist. Let's try a search:"
          />
          <div style={{ textAlign: "center" }}>
            <main id="docs-main" tabindex="-1">
              <div>
                <h1 className="pds-spacing-mar-block-end-3xl">
                  Sorry, there's no page at that URL.
                </h1>
                <img
                  className="notfound"
                  style={{ maxWidth: 400 }}
                  src={SVG404}
                />
              </div>
            </main>
          </div>
        </Container>
        <StaticFooter />
      </>
    )
  }
}

export default NotFoundPage
