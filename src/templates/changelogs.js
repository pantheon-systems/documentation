import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../layout/Layout"
import NavButtons from "../components/navButtons"
import Callout from "../components/callout"
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
  headline1,
  headline2,
  headline3,
  headline4,
} from "../components/releaseHeadlines"

import {
  Container,
  Icon,
  Pager,
  SidebarLayout,
} from "@pantheon-systems/pds-toolkit-react"

const shortcodes = {
  Callout,
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
  h1: headline2,
  h2: headline3,
  h3: headline4,
}

// Set container width for search and main content.
const containerWidth = "standard"

// Combined changelog template.
class ChangelogsTemplate extends React.Component {
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
    const changelogs = this.props.data.allMdx.edges
    return (
      <Layout containerWidth={containerWidth}>
        <SEO
          title="Pantheon Changelog"
          description="Pantheon Changelog"
          image={"assets/images/default-thumb-doc.png"}
        />
        <main id="docs-main">
          <Container width={containerWidth}>
            <h1>Pantheon Changelog</h1>
            <div className="pds-spacing-mar-block-end-3xl">
              <p className="pds-lead-text pds-lead-text--small">
                Sign up for the Pantheon Changelog Newsletter to receive a
                monthly email on what's new and improved across the platform.
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
            <hr />
            <SidebarLayout sidebarMobileLocation="before">
              <div slot="content">
                <div id="doc" className="doc changelog__content">
                  <div id="pds-toc-source">
                    <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                      {changelogs.map((changelog) => (
                        <React.Fragment key={changelog.id}>
                          <Link
                            to={`/${changelog.node.fields.slug}`}
                            className="individual-changelog-link"
                          >
                            <h2 id={changelog.node.fields.slug}>
                              {changelog.node.frontmatter.title}
                            </h2>
                          </Link>
                          <MDXProvider components={shortcodes}>
                            <MDXRenderer>{changelog.node.body}</MDXRenderer>
                          </MDXProvider>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <TOC slot="sidebar" title="Contents" />
            </SidebarLayout>
            <NavButtons
              prev={this.props.pageContext.previous}
              next={this.props.pageContext.next}
              prevTitle="Older"
              nextTitle="Newer"
            />
          </Container>
        </main>
      </Layout>
    )
  }
}

export default ChangelogsTemplate

export const pageQuery = graphql`
  query Changelogs($skip: Int!, $limit: Int!) {
    allMdx(
      filter: {
        fileAbsolutePath: { regex: "/changelogs/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          id
          body
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
