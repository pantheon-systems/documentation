import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
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
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../components/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Commands from "../components/commands"
import GetFeedback from "../components/getFeedback"

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
                activePage={"/" + node.fields.slug}
              />
              <div id="terminus" className="terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <div
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <header className="buttons">
                      <h1>{node.frontmatter.subtitle}</h1>
                      <Contributors
                        contributors={node.frontmatter.contributors}
                      />
                      <Github
                        pageTitle={node.frontmatter.title}
                        path={node.fields.slug}
                      />
                      <Twitter
                        pageTitle={node.frontmatter.title}
                        path={node.fields.slug}
                      />
                      <Slack />
                      <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                    </header>
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
                  prev={node.frontmatter.previousurl}
                  next={node.frontmatter.nexturl}
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
  query GuidePageBySlug($slug: String!) {
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
        subtitle
        description
        nexturl
        previousurl
        showtoc
        contributors {
          id
          name
          twitter
        }
        getfeedbackform
      }
      fileAbsolutePath
    }
  }
`
