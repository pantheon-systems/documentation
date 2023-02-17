import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"
import NavButtons from "../components/navButtons"

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
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"

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
  Enablement,
  Color,
  Download,
}

class ChangelogTemplate extends React.Component {
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

    return (
      <Layout>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
        />
        <main className="container doc-content-well" id="docs-main">
          <article className="doc article col-md-9 md-70">
            <div id="doc" className="doc article col-md-9 md-70">
              <h1 className="toc-ignore">Pantheon Changelog</h1>
              <h2 className="toc-ignore">{node.frontmatter.title}</h2>
              <Callout
                title="Subscribe Now"
                link="https://learn.pantheon.io/Changelog-Opt-In.html"
              >
                Sign up for the Pantheon Changelog Newsletter to receive a
                monthly email on what's new and improved across the platform.
              </Callout>
              <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                <MDXProvider components={shortcodes}>
                  <MDXRenderer>{node.body}</MDXRenderer>
                </MDXProvider>
              </div>
            </div>
          </article>
          <TOC title="Contents" />
          <NavButtons
            prev={
              this.props.pageContext.previous
                ? `/${this.props.pageContext.previous}`
                : null
            }
            next={
              this.props.pageContext.next
                ? `/${this.props.pageContext.next}`
                : null
            }
            prevTitle="Older"
            nextTitle="Newer"
          />
        </main>
      </Layout>
    )
  }
}

export default ChangelogTemplate

export const pageQuery = graphql`
  query ChangelogBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
