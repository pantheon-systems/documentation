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
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Navbar from "../components/navbar"
import PreviousNextControl from "../components/previousNextControl"
import SEO from "../components/seo"

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

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-terminus",
    link: "/docs/terminus",
    title: "Get Started",
  },
  {
    id: "docs-terminus-install",
    link: "/docs/terminus/install",
    title: "Install",
  },
  {
    id: "docs-terminus-examples",
    link: "/docs/terminus/examples",
    title: "Example Usage",
  },
  {
    id: "docs-terminus-commands",
    link: "/docs/terminus/commands",
    title: "Commands",
  },
  {
    id: "docs-terminus-scripting",
    link: "/docs/terminus/scripting",
    title: "Scripting",
  },
  {
    id: "docs-terminus-plugins",
    link: "/docs/terminus/plugins",
    title: "Extend with Plugins",
    items: [
      {
        id: "docs-terminus-directory",
        link: "/docs/terminus/plugins/directory",
        title: "Directory",
      },
      {
        id: "docs-terminus-create",
        link: "/docs/terminus/plugins/create",
        title: "Create Plugins",
      },
    ],
  },
  {
    id: "docs-terminus-configuration",
    link: "/docs/terminus/configuration",
    title: "Configuration File",
  },
  {
    id: "docs-terminus-updates",
    link: "/docs/terminus/updates",
    title: "Version Updates",
  },
]

class TerminusTemplate extends React.Component {
  componentDidMount() {
    window.jQuery('[data-toggle="tooltip"]').popover({
      trigger: "hover",
      placement: "right",
    })
  }

  render() {
    const node = this.props.data.mdx
    const contentCols = node.frontmatter.showToc ? 9 : 12

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
                items={items}
                activePage={"/" + node.fields.slug}
              />
              <div id="terminus" className="terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <div
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <header>
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
                  {node.frontmatter.showToc && (
                    <div
                      className="col-md-3 pio-docs-sidebar hidden-print hidden-xs hidden-sm affix-top"
                      role="complementary"
                    >
                      <TOC title="Contents" />
                    </div>
                  )}
                </div>
                <PreviousNextControl
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

export default TerminusTemplate

export const pageQuery = graphql`
  query TerminusPageBySlug($slug: String!) {
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
        showToc: terminustoc
        contributors {
          id
          name
          twitter
        }
      }
      fileAbsolutePath
    }
  }
`
