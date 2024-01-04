import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/releaseNoteTeaser.js"
import { releaseNoteCategories } from "../data/releaseNoteCategories.js"
import ReleaseNoteCategorySelector from "../components/releaseNoteCategorySelector.js"
import { Container } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class ReleaseNotesListingByCategoryTemplate extends React.Component {

  render() {
    const releasenotes = this.props.data.allMdx.edges
    const categorySlug = this.props.pageContext.category;
    const categoryDisplayName = releaseNoteCategories[categorySlug]["displayName"];

    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title="Pantheon Release Notes about {categoryDisplayName}"
          description="A filtering of changes to the Pantheon Platform by the category of {categoryDisplayName}"
          image={"assets/images/default-thumb-doc.png"}
        />
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth}>
            <h1>Pantheon Release Notes: {categoryDisplayName}</h1>
            <p>TODO Render the category description here.</p>
            <ReleaseNoteCategorySelector />
            <hr />
            <div id="doc" className="doc changelog__content">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                  {releasenotes.map((releasenote) => (
                      <ReleaseNoteTeaser ReleaseNoteData={releasenote.node} />
                  ))}
              </div>
            </div>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNotesListingByCategoryTemplate

export const pageQuery = graphql`
  query releasenotes($category: String!) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/releasenotes/" }
          frontmatter: { categories: {eq: $category}}
      }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) {
      edges {
        node {
      ...theReleaseNoteFields
        }
      }
    }
  }
`
