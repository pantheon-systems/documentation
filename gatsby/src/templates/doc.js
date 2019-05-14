import React from "react"
import { graphql } from "gatsby"

import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'

// import SiteInfo from "../components/siteInfo"
import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm, scale } from "../utils/typography"

import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/externalLink"
import Popover from "../components/popover"

const shortcodes = { Callout, Alert, Accordion, ExternalLink, Icon,Popover }

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
            <MDXProvider components={shortcodes}>
              <MDXRenderer>{node.code.body}</MDXRenderer>
            </MDXProvider>
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