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
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../layout/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Commands from "../components/commands"
import GetFeedback from "../components/getFeedback"
import DefList from "../components/defList.js"
import Definition from "../components/definition.js"
import Enablement from "../components/enablement.js"
import Color from "../components/color.js"
import Download from "../components/download.js"
import BuildTools from "../components/buildTools.js"

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
  Releases,
  TerminusVersion,
  Commands,
  DefList,
  Definition,
  Enablement,
  Download,
  BuildTools,
}

class GuideTemplate extends React.Component {
  componentDidMount() {
    window.jQuery('[data-toggle="tooltip"]').popover({
      trigger: "hover",
      placement: "right",
    })
  }

  render() {
    const node = this.props.data.mdx
    const contentCols = node.frontmatter.showtoc ? 9 : 12

    const items = this.props.data.allMdx.edges.map(item => {
      return {
        id: item.node.id,
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      }
    })

    return (
      <Layout>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"docs/assets/images/terminus-thumbLarge.png"}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="row col-md-12 guide-nav manual-guide-toc-well">
              <Navbar
                title={node.frontmatter.title}
                activePage={node.fields.slug}
                items={items}
              />
              <div id="terminus" className="terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <div
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <HeaderBody
                      title={node.frontmatter.title}
                      subtitle={node.frontmatter.subtitle}
                      description={node.frontmatter.description}
                      slug={node.fields.slug}
                      contributors={node.frontmatter.contributors}
                      featured={node.frontmatter.featuredcontributor}
                    />
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer>{node.code.body}</MDXRenderer>
                    </MDXProvider>
                  </div>
                  {node.frontmatter.showtoc && (
                    <div
                      className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
                      role="complementary"
                    >
                      <TOC title="Contents" />
                    </div>
                  )}
                </div>
                {node.frontmatter.getfeedbackform && (
                  <GetFeedback
                    formId={
                      node.frontmatter.getfeedbackform === "default"
                        ? "tfYOGoE7"
                        : node.frontmatter.getfeedbackform
                    }
                    page={"/" + node.fields.slug}
                    topic="addons"
                  />
                )}
                <NavButtons
                  prev={this.props.pageContext.previous}
                  next={this.props.pageContext.next}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default GuideTemplate

export const pageQuery = graphql`
  query GuidePageBySlug($slug: String!, $guide_directory: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      code {
        body
      }
      fields {
        slug
        guide_directory
      }
      frontmatter {
        title
        subtitle
        description
        showtoc
        editpath
        contributors {
          id
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        getfeedbackform
      }
      fileAbsolutePath
    }

    allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: { guide_directory: { eq: $guide_directory } }
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            guide_directory
          }
          frontmatter {
            subtitle
          }
        }
      }
    }
  }
`
