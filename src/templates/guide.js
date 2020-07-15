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
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../layout/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Commands from "../components/commands"
import GetFeedback from "../components/getFeedback"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"
import BuildTools from "../components/buildTools.js"
import BuildToolsChangelog from "../components/buildToolsChangelog.js"
import Partial from "../components/partial.js"
import Image from "../layout/image"
import ChecklistItem from "../components/checklistItem"
import ReviewDate from "../components/reviewDate"
import Youtube from "../components/youtube"
import ResourceSelector from "../components/resourceSelector"
import DNSProviderDocs from "../components/dns-provider-docs.js"
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
  Commands,
  Enablement,
  Download,
  BuildTools,
  BuildToolsChangelog,
  Partial,
  ChecklistItem,
  Image,
  ReviewDate,
  Youtube,
  ResourceSelector,
  DNSProviderDocs,
  Check,
}

class GuideTemplate extends React.Component {
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
          title={node.frontmatter.subtitle + " | " + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/assets/images/terminus-thumbLarge.png"}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />
          <div className="container">
            <div className="row col-md-12 guide-nav manual-guide-toc-well">
              <Navbar
                title={node.frontmatter.title}
                activePage={node.fields.slug}
                items={items}
              />
              <main id="docs-main" className="col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <article
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                    id="doc"
                  >
                    <HeaderBody
                      title={node.frontmatter.title}
                      subtitle={node.frontmatter.subtitle}
                      description={node.frontmatter.description}
                      slug={node.fields.slug}
                      contributors={node.frontmatter.contributors}
                      featured={node.frontmatter.featuredcontributor}
                      editPath={node.fields.editPath}
                      reviewDate={node.frontmatter.reviewed}
                      isoDate={isoDate.frontmatter.reviewed}
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
              </main>
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
      body
      fields {
        slug
        guide_directory
        editPath
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
        reviewed(formatString: "MMMM DD, YYYY")
        getfeedbackform
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
    allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: { guide_directory: { eq: $guide_directory } }
        frontmatter: { draft: {ne: true}}
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
