import React from "react"
import { graphql } from "gatsby"

import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
// import SiteInfo from "../components/siteInfo"
// import SEO from "../components/seo"

import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import Contributors from "../components/contributors"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import Github from "../components/github"
import Twitter from "../components/twitter"
import Slack from "../components/slack"
import GetFeedback from "../components/getFeedback"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"

const shortcodes = {
  Callout,
  Alert,
  Accordion,
  ExternalLink,
  Icon,
  Popover,
  TabList,
  Tab,
  Card,
  CardGroup,
}

class DocTemplate extends React.Component {
  componentDidMount() {
    window.jQuery('[data-toggle="tooltip"]').popover({
      trigger: "hover",
      placement: "right",
    })
  }

  render() {
    const node = this.props.data.mdx

    return (
      <Layout>
        <div className="container">
          <div className="row doc-content-well">
            <div id="doc" className="article col-md-9 md-70">
              <h1>{node.frontmatter.title}</h1>
              <p className="article-subhead">{node.frontmatter.description}</p>
              <Contributors contributors={node.frontmatter.contributors} />
              <Github
                pageTitle={node.frontmatter.title}
                path={node.fields.slug}
              />
              <Twitter
                pageTitle={node.frontmatter.title}
                path={node.fields.slug}
              />
              <Slack />
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{node.code.body}</MDXRenderer>
              </MDXProvider>
            </div>
            <div
              className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
              role="complementary"
            >
              <TOC title="Contents" />
            </div>
          </div>
        </div>
        <GetFeedback />
      </Layout>
    )
  }
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      code {
        body
      }
      fields {
        slug
      }
      frontmatter {
        title
        description
        contributors {
          id
          name
        }
      }
      fileAbsolutePath
    }
  }
`
