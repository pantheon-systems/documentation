import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"
import Callout from "../components/callout"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Icon from "../components/icon"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import TOC from "../components/toc"
import GetFeedback from "../components/getFeedback"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import DefList from "../components/defList.js"
import Definition from "../components/definition.js"
import Enablement from "../components/enablement.js"
import Color from "../components/color.js"
import Download from "../components/download.js"

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
  DefList,
  Definition,
  Enablement,
  Color,
  Download
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
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"docs/assets/images/default-thumb-doc.png"}
        />
        <div className="container">
          <div className="row doc-content-well">
            <div id="doc" className="doc article col-md-9 md-70">
              <HeaderBody
                title={node.frontmatter.title}
                subtitle={node.frontmatter.subtitle}
                description={node.frontmatter.description}
                slug={node.fields.slug}
                contributors={node.frontmatter.contributors}
                featured={node.frontmatter.featuredcontributor}
              />
              <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                <MDXProvider components={shortcodes}>
                  <MDXRenderer>{node.code.body}</MDXRenderer>
                </MDXProvider>
              </div>
            </div>
            <div
              className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
              role="complementary"
            >
              <TOC title="Contents" />
            </div>
          </div>
        </div>
        {node.frontmatter.getfeedbackform && (
          <GetFeedback
            formId={
              node.frontmatter.getfeedbackform === "default"
                ? "12z1fMzn"
                : node.frontmatter.getfeedbackform
            }
            page={"/" + node.fields.slug}
            topic="addons"
          />
        )}
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
        getfeedbackform
        contributors {
          id
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
      }
      fileAbsolutePath
    }
  }
`
