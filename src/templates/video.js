import React from "react"
import { graphql } from "gatsby"
import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"
import SEO from "../layout/seo"
import { Container } from "@pantheon-systems/pds-toolkit-react"
import MdxWrapper from "../components/mdxWrapper"


// Set container width for search and main content.
const containerWidth = "standard"

class VideoTemplate extends React.Component {

  render() {
    const node = this.props.data.mdx

    return (
      <Layout containerWidth={containerWidth}>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
          type={node.frontmatter.type}
        />
        <main id="docs-main" tabIndex="-1">
          <Container width={containerWidth} className="docs-video">
            <HeaderBody
              title={node.frontmatter.title}
              subtitle={node.frontmatter.subtitle}
              description={node.frontmatter.description}
              slug={node.fields.slug}
              contributors={node.frontmatter.contributors}
              featured={node.frontmatter.featuredcontributor}
            />
            <article className="pds-spacing-mar-block-end-4xl">
              <MdxWrapper mdx={node.body} />
            </article>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default VideoTemplate

export const pageQuery = graphql`
  query VideoBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        type
      }
      fileAbsolutePath
    }
  }
`
