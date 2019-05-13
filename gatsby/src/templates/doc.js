import React from "react"
import { graphql } from "gatsby"

import MDXRenderer from 'gatsby-mdx/mdx-renderer';

// import SiteInfo from "../components/siteInfo"
import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"


class DocTemplate extends React.Component {
  render() {
    const node = this.props.data.mdx

    return (
      <Layout>
        <div className="container">
          <div className="row doc-content-well">
            <h1>{node.frontmatter.title}</h1>
            <p className="article-subhead">
              {node.frontmatter.description}
            </p>
            <MDXRenderer>{node.code.body}</MDXRenderer>
          </div>
        </div>
      </Layout>
    )
  }
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    mdx(fields: {slug: {eq: $slug}}) {
      id
      code {
        body
      }
      frontmatter {
        title
        description
        contributors {
          id
          name
        }
      }
    }
  }
`