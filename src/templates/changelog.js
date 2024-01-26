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
import TOC from "../components/toc"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"

import {
  Container,
  Icon,
  Pager,
  SidebarLayout,
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

// Set container width for search and main content.
const containerWidth = "standard"

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
      <Layout containerWidth={containerWidth} footerBorder>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
        />
        <main id="docs-main" tabIndex="-1">
          <Container width={containerWidth}>
            <div className="pds-overline-text pds-spacing-mar-block-end-xs">
              Pantheon Changelog
            </div>
            <h1>{node.frontmatter.title}</h1>
            <div className="pds-spacing-mar-block-end-3xl">
              <p className="pds-lead-text pds-lead-text--sm">
              We're transitioning away from publishing product updates in this section of Pantheon Docs to the new <a href="/release-notes"> release notes</a> site.
              </p>
            </div>
            <hr />

            <SidebarLayout sidebarMobileLocation="before">
              <article
                slot="content"
                className="changelog changelog--individual"
              >
                <div id="doc" className="doc changelog__content">
                  <div id="pds-toc-source">
                    <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                      <MDXProvider components={shortcodes}>
                        <MDXRenderer>{node.body}</MDXRenderer>
                      </MDXProvider>
                    </div>
                  </div>
                </div>
              </article>
              <TOC slot="sidebar" title="Contents" />
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
          </Container>
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
