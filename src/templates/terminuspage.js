import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
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
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../layout/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Download from "../components/download"
import Commands from "../components/commands"
import ReviewDate from "../components/reviewDate"
import Check from "../components/check.js"

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
  Download,
  Commands,
  ReviewDate,
  Check,
}

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-terminus",
    link: "/terminus",
    title: "Get Started",
  },
  {
    id: "docs-terminus-install",
    link: "/terminus/install",
    title: "Install",
  },
  {
    id: "docs-terminus-examples",
    link: "/terminus/examples",
    title: "Example Usage",
  },
  {
    id: "docs-terminus-commands",
    link: "/terminus/commands",
    title: "Commands",
  },
  {
    id: "docs-terminus-scripting",
    link: "/terminus/scripting",
    title: "Scripting",
  },
  {
    id: "docs-terminus-plugins",
    link: "/terminus/plugins",
    title: "Extend with Plugins",
    items: [
      {
        id: "docs-terminus-directory",
        link: "/terminus/plugins/directory",
        title: "Directory",
      },
      {
        id: "docs-terminus-create",
        link: "/terminus/plugins/create",
        title: "Create Plugins",
      },
    ],
  },
  {
    id: "docs-terminus-configuration",
    link: "/terminus/configuration",
    title: "Configuration File",
  },
  {
    id: "docs-terminus-updates",
    link: "/terminus/updates",
    title: "Version Updates",
  },
]

class TerminusTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
    })

    $("body").on("click", function(e) {
      $('[data-toggle="popover"]').each(function() {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function(e) {
      $('[data-toggle="popover"]').each(function() {
        if (event.which === 27) {
          $(this).popover("hide")
        }
      })
    })
  }

  render() {
    const node = this.props.data.mdx
    const contentCols = node.frontmatter.showtoc ? 9 : 12
    const isoDate = this.props.data.date
    const ifCommandsDate =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.terminusReleasesJson.published_at
        : node.frontmatter.reviewed
    const ifCommandsISO =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.jsonISO.published_at
        : isoDate.frontmatter.reviewed

    return (
      <Layout>
        <SEO
          title={node.frontmatter.subtitle + " | " + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/assets/images/terminus-thumbLarge.png"}
          reviewed={ifCommandsISO}
          type={node.frontmatter.type}
        />
          <div className="container-fluid">
            <div className="row col-md-10 guide-nav manual-guide-toc-well">
              <Navbar
                title={node.frontmatter.title}
                items={items}
                activePage={node.fields.slug}
              />
              <main id="doc" className="terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <article
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <HeaderBody
                      title={node.frontmatter.title}
                      subtitle={node.frontmatter.subtitle}
                      description={node.frontmatter.description}
                      slug={node.fields.slug}
                      contributors={node.frontmatter.contributors}
                      featured={node.frontmatter.featuredcontributor}
                      editPath={node.fields.editPath}
                      reviewDate={ifCommandsDate}
                      isoDate={ifCommandsISO}
                    />
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer>{node.body}</MDXRenderer>
                    </MDXProvider>
                  </article>
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
                  prev={
                    node.frontmatter.previousurl
                      ? `/${node.frontmatter.previousurl}`
                      : null
                  }
                  next={
                    node.frontmatter.nexturl
                      ? `/${node.frontmatter.nexturl}`
                      : null
                  }
                />
              </main>
            </div>
          </div>
        <GetFeedback formId="tfYOGoE7" page={"/" + node.fields.slug} />
      </Layout>
    )
  }
}

export default TerminusTemplate

export const pageQuery = graphql`
  query TerminusPageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
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
        reviewed(formatString: "MMMM DD, YYYY")
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
    terminusReleasesJson {
      published_at(formatString: "MMMM DD, YYYY")
    }
    jsonISO: terminusReleasesJson {
      published_at(formatString: "YYYY-MM-DD")
    }
  }
`
