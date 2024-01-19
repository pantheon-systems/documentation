import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteTeaser from "../components/ReleaseNoteTeaser"
import { releaseNoteCategoryLoader } from "../data/releaseNoteCategories.js"
import ReleaseNoteCategorySelector from "../components/releaseNoteCategorySelector.js"
import { Container } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class ReleaseNotesListingByCategoryTemplate extends React.Component {
  render() {
    const releasenotes = this.props.data.allMdx.edges
    const categorySlug = this.props.pageContext.category
    const categoryData = releaseNoteCategoryLoader(categorySlug)

    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title="Pantheon Release Notes about {categoryDisplayName}"
          description="A filtering of changes to the Pantheon Platform by the category of {categoryDisplayName}"
          image={"assets/images/default-thumb-doc.png"}
        />
        <main id="docs-main" tabIndex="-1">
          <Container width={containerWidth}>
            <h1>Pantheon Release Notes: {categoryData["displayName"]}</h1>
            <ReleaseNoteCategorySelector />

            <div id="doc">
              {releasenotes.map((releasenote, index) => (
                <ReleaseNoteTeaser
                  key={index}
                  ReleaseNoteData={releasenote.node}
                  className="pds-spacing-mar-block-4xl"
                />
              ))}
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
        frontmatter: { categories: { eq: $category } }
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
