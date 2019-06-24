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
                items={items}
                activePage={"/" + node.fields.slug}
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
        showtoc
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
