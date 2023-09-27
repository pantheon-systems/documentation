import React from "react"
import Layout from "../layout/Layout"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"

import { Container, FlexContainer } from "@pantheon-systems/pds-toolkit-react"

class NotFoundPage extends React.Component {
  render() {
    const { pathname } = this.props.location

    return (
      <Layout containerWidth="narrow">
        <SEO
          title="404"
          description="Zoinks! You've hit a URL that doesn't exist. Let's try a search:"
        />
        <Container width="narrow">
          <main id="docs-main">
            <FlexContainer
              alignContent="start"
              alignItems="center"
              flexDirection="column"
              mobileFlex="same"
              className="pds-spacing-mar-block-end-6xl"
            >
              <h1>Sorry, there's no page at that URL.</h1>
              <img
                className="notfound"
                style={{ maxWidth: 400 }}
                src={SVG404}
              />
            </FlexContainer>
          </main>
        </Container>
      </Layout>
    )
  }
}

export default NotFoundPage
