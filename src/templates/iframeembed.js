import React from "react"
import MdxWrapper from "../components/mdxWrapper"
import { Container  } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class iFrameEmbedTemplate extends React.Component {
  render() {
    const data = this.props.pageContext;

    return (

        <main id="docs-main" tabIndex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-mar-block-start-3xl"
          >
            <article className="pds-spacing-pad-block-end-xl">
              <div id="doc" className="doc changelog__content">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                <MdxWrapper mdx={data.body} />
                </div>
              </div>
            </article>
          </Container>
        </main>
    )
  }
}

export default iFrameEmbedTemplate
