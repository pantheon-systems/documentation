import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/layout"
import NavButtons from "../components/navButtons"
import Alert from "../components/alert"
import Accordion from "../components/accordion"
import ExternalLink from "../components/externalLink"
import Popover from "../components/popover"
import TabList from "../components/tabList"
import Tab from "../components/tab"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"

import {
  Icon,
  Pager,
  SidebarLayout,
  TableOfContents,
} from "@pantheon-systems/pds-toolkit-react"

const shortcodes = {
  Alert,
  Accordion,
  ExternalLink,
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
          <SidebarLayout>
            <article
              slot="content"
              id="pds-toc-source"
              className="changelog changelog--individual"
            >
              <div id="doc" className="doc changelog__content">
                <div className="pds-overline-text pds-spacing-mar-block-end-xs">
                  Pantheon Changelog
                </div>
                <h1>{node.frontmatter.title}</h1>
                <div className="pds-spacing-mar-block-end-3xl">
                  <p className="pds-lead-text pds-lead-text--small">
                    Sign up for the Pantheon Changelog Newsletter to receive a
                    monthly email on what's new and improved across the
                    platform.
                  </p>
                  <a
                    className="pds-button"
                    href="https://learn.pantheon.io/Changelog-Opt-In.html"
                    target="_blank"
                  >
                    Subscribe Now
                    <Icon iconName="externalLink" />
                  </a>
                </div>
                <hr className="pds-spacing-mar-block-end-3xl" />

                <div className="pds-spacing-mar-block-start-l pds-spacing-mar-block-end-4xl">
                  <MDXProvider components={shortcodes}>
                    <MDXRenderer>{node.body}</MDXRenderer>
                  </MDXProvider>
                </div>
              </div>
            </article>
            <TableOfContents
              slot="sidebar"
              headingText="Contents"
              ignoreClass="toc-ignore"
            />
          </SidebarLayout>
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
