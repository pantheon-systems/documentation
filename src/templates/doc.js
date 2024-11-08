import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout/layout"
import SEO from "../layout/seo"
import HeaderBody from "../components/headerBody"
import TOC from "../components/toc"
import GetFeedback from "../components/getFeedback"

import { Container, SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

import MdxWrapper from "../components/mdxWrapper"


// Set container width for search and main content.
const containerWidth = "standard"

class DocTemplate extends React.Component {

  render() {
    const node = this.props.data.doc
    const isoDate = this.props.data.date

    return (
      <Layout footerBorder>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
          categories={node.frontmatter.categories}
          keywords={node.frontmatter.tags}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />
        <main id="docs-main" tabIndex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-pad-block-end-4xl"
          >
            <SidebarLayout>
              <article slot="content" className="doc article styleguide">
                <HeaderBody
                  title={node.frontmatter.title}
                  subtitle={node.frontmatter.subtitle}
                  description={node.frontmatter.description}
                  slug={node.fields.slug}
                  contributors={node.frontmatter.contributors}
                  featured={node.frontmatter.featuredcontributor}
                  editPath={node.fields.editPath}
                  reviewDate={node.frontmatter.reviewed}
                  isoDate={isoDate.frontmatter.reviewed}
                  cms={node.frontmatter.cms}
                />
                <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                  <MdxWrapper mdx={node.body} />

                </div>
              </article>
              <TOC slot="sidebar" title="Contents" />
              <GetFeedback
                formId="tfYOGoE7"
                page={node.frontmatter.title}
                topic={
                  node.frontmatter.categories
                    ? node.frontmatter.categories.toString()
                    : null
                }
              />
            </SidebarLayout>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        description
        categories
        cms
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        reviewed(formatString: "MMMM DD, YYYY")
        showtoc
        tags
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
  }
`
