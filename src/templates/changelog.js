import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import HeaderBody from "../components/headerBody"
import NavButtons from "../components/navButtons"

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

import { FlexContainer } from "@pantheon-systems/pds-toolkit-react"

import "../styles/changelogs.css"

const shortcodes = {
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

// Individual changelog template.

class ChangelogTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
    })

    $("body").on("click", function (e) {
      $('[data-toggle="popover"]').each(function () {
        if (
          !$(this).is(e.target) &&
          $(this).has(e.target).length === 0 &&
          $(".popover").has(e.target).length === 0
        ) {
          $(this).popover("hide")
        }
      })
    })

    $("body").keyup(function (e) {
      $('[data-toggle="popover"]').each(function () {
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
        <main className="pds-container pds-container--wide" id="docs-main">
          <article className="changelog changelog--individual">
            <div id="doc" className="doc changelog__content">
              <div className="pds-overline-text">Pantheon Changelog</div>
              <h1 className="toc-ignore">{node.frontmatter.title}</h1>
              <div className="pds-spacing-mar-block-end-3xl">
                <p className="pds-lead-text pds-lead-text--small">
                  Sign up for the Pantheon Changelog Newsletter to receive a
                  monthly email on what's new and improved across the platform.
                </p>
                <a
                  className="pds-button"
                  href="https://learn.pantheon.io/Changelog-Opt-In.html"
                >
                  Subscribe Now
                </a>
              </div>
              <hr className="pds-spacing-mar-block-end-3xl" />

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
