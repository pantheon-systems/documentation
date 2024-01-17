import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/releaseNoteTeaser.js"
import ReleaseNoteCategorySelector from "../components/releaseNoteCategorySelector.js"
import { releaseNoteFragment } from "../fragments/releaseNote.js"

import { Container } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class ReleaseNotesListingTemplate extends React.Component {
  render() {
    const releasenotes = this.props.data.allMdx.edges
    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title="Pantheon Release Notes"
          description="A summary of changes to the Pantheon Platform"
          image={"assets/images/default-thumb-doc.png"}
        />
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth}>
            <h1>Pantheon Release Notes</h1>
            <ReleaseNoteCategorySelector />
            <hr />
            <div id="doc" className="doc changelog__content">
              <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                {releasenotes.map((releasenote, index) => (
                  <ReleaseNoteTeaser
                    key={index}
                    ReleaseNoteData={releasenote.node}
                  />
                ))}
              </div>
            </div>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNotesListingTemplate

export const pageQuery = graphql`
  query releasenotesListing {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/releasenotes/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
          ... on Mdx {
            ...theReleaseNoteFields
          }
        }
      }
    }
  }
`
