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
import ReleaseNoteCategories from "../components/releaseNoteCategories"


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

class ReleaseNoteTemplate extends React.Component {
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
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth}>
            <div className="pds-overline-text pds-spacing-mar-block-end-xs">
              Pantheon Release Notes
            </div>
            <h1>{node.frontmatter.title}</h1>
            <ReleaseNoteCategories categories={node.frontmatter.categories} />

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
            </SidebarLayout>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ReleaseNoteTemplate

export const pageQuery = graphql`
  query ChangelogBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title,
        published_date,
        categories
      }
    }
  }
`
