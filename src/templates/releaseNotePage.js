import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteCategories from "../components/ReleaseNoteCategories"
import MdxWrapper from "../components/mdxWrapper.js"
import PublishedDate from "../components/PublishedDate"
// This is used to get the fields from the MDX file.
import { releaseNoteFragment } from "../fragments/releaseNote.js"
import { Container, SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

// Set container width for search and main content.
const containerWidth = "standard"

class ReleaseNoteTemplate extends React.Component {
  render() {
    const node = this.props.data.mdx

    return (
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
        />
        <main id="docs-main" tabIndex="-1">
          <Container width={containerWidth}>
            <Link to="/release-notes" className="pds-spacing-mar-block-end-m">
              <div className="pds-overline-text pds-overline-text--lg pds-spacing-mar-block-end-xs">
                Pantheon Release Notes
              </div>
            </Link>
            <h1 className="pds-spacing-mar-block-end-l">
              {node.frontmatter.title}
            </h1>
            <ReleaseNoteCategories
              categories={node.frontmatter.categories}
              displayType="page"
              className="pds-spacing-mar-block-end-xl"
            />

            <article className="pds-spacing-pad-block-end-xl">
              <div id="doc" className="doc changelog__content">
                <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                  <PublishedDate
                    dateString={node.frontmatter.published_date}
                    className="pds-spacing-mar-block-end-m"
                  />
                  <MdxWrapper mdx={node.body} />
                </div>
              </div>
            </article>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNoteTemplate

export const pageQuery = graphql`
  query ReleaseNoteBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      ...theReleaseNoteFields
    }
  }
`
