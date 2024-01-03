import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import ReleaseNoteCategories from "../components/releaseNoteCategories"
import MdxWrapper from "../components/mdxWrapper.js"
import FormattedPublishedDate from "../components/formattedPublishedDate.js"
import { releaseNotedFraggy } from "../fragments/releaseNote.js"
import {
  Container,
  SidebarLayout,
} from "@pantheon-systems/pds-toolkit-react"

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
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth}>
            <div className="pds-overline-text pds-spacing-mar-block-end-xs">
              Pantheon Release Notes
            </div>
            <h1>{node.frontmatter.title}</h1>
            <ReleaseNoteCategories categories={node.frontmatter.categories} />
            <hr />
            <SidebarLayout sidebarMobileLocation="before">
              <article
                slot="content"
                className="changelog changelog--individual"
              >
                <div id="doc" className="doc changelog__content">
                    <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                      <FormattedPublishedDate dateString={node.frontmatter.published_date} />
                      <MdxWrapper mdx={node.body} />
                    </div>
                </div>
              </article>
            </SidebarLayout>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNoteTemplate

const frontMatterFields = `
  frontmatter {
    title
    published_date
    categories
  }
`;
/*
const theQuery = `
  query ReleaseNoteBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title,
        published_date,
        categories
      }
    }
  }
`
export const pageQuery = graphql(
  {query: theQuery}
  );

*/

export const somefields = graphql`
   fragment theReleaseNoteFields on Mdx {
  id
  body
      fields {
        slug
      }
      frontmatter {
        title,
        published_date,
        categories
      }

}


`


export const pageQuery = graphql`



query ReleaseNoteBySlug($slug: String!) {



    mdx(fields: { slug: { eq: $slug } }) {
      ...theReleaseNoteFields


    }
  }`
