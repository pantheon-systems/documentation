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
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"
import Partial from "../components/partial"
import Image from "../layout/image"
import Example from "../components/styleExample"
import Youtube from "../components/youtube"
import Wistia from "../components/wistia"

import { Container } from "@pantheon-systems/pds-toolkit-react"

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
  Partial,
  Image,
  Example,
  Youtube,
  Wistia
}

// Set container width for search and main content.
const containerWidth = "narrow"

class VideoTemplate extends React.Component {
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
      <Layout containerWidth={containerWidth}>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
          type={node.frontmatter.type}
        />
        <main id="docs-main" tabindex="-1">
          <Container width={containerWidth} className="docs-video">
            <HeaderBody
              title={node.frontmatter.title}
              subtitle={node.frontmatter.subtitle}
              description={node.frontmatter.description}
              slug={node.fields.slug}
              contributors={node.frontmatter.contributors}
              featured={node.frontmatter.featuredcontributor}
            />
            <article className="pds-spacing-mar-block-end-4xl">
              <MDXProvider components={shortcodes}>
                <MDXRenderer>{node.body}</MDXRenderer>
              </MDXProvider>
            </article>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default VideoTemplate

export const pageQuery = graphql`
  query VideoBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        type
      }
      fileAbsolutePath
    }
  }
`
