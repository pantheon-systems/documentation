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
import Product from "../components/product"
import ProductGroup from "../components/productGroup"
import SEO from "../layout/seo"
import Enablement from "../components/enablement"
import Color from "../components/color.js"
import Download from "../components/download"
import Partial from "../components/partial"
import Image from "../layout/image"
import Example from "../components/styleExample"
import DrushChangelog from "../components/drushChangelog"
import ReviewDate from "../components/reviewDate"
import Youtube from "../components/youtube"
import ResourceSelector from "../components/resourceSelector"
import DNSProviderDocs from "../components/dns-provider-docs.js"
import Check from "../components/check.js"
import Wistia from "../components/wistia"

import { Container, SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

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
  Product,
  ProductGroup,
  Enablement,
  Color,
  Download,
  Partial,
  Image,
  Example,
  DrushChangelog,
  ReviewDate,
  Youtube,
  ResourceSelector,
  DNSProviderDocs,
  Check,
  Wistia,
}

// Set container width for search and main content.
const containerWidth = "standard"

class DocTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
      placement: "right",
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
    const node = this.props.data.doc
    const isoDate = this.props.data.date

    return (
      <Layout footerBorder>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/default-thumb-doc.png"}
          categories={node.frontmatter.categories}
          keywords={node.frontmatter.tags}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />
        <main id="docs-main" tabindex="-1">
          <Container
            width={containerWidth}
            className="pds-spacing-pad-block-end-4xl"
          >
            <SidebarLayout>
              <article slot="content" className="doc article styleguide">
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
                  cms={node.frontmatter.cms}
                />
                <div style={{ marginTop: "15px", marginBottom: "45px" }}>
                  <MDXProvider components={shortcodes}>
                    <MDXRenderer>{node.body}</MDXRenderer>
                  </MDXProvider>
                </div>
              </article>
              <TOC slot="sidebar" title="Contents" />
              <GetFeedback
                formId="tfYOGoE7"
                page={node.frontmatter.title}
                topic={
                  node.frontmatter.categories
                    ? node.frontmatter.categories.toString()
                    : null
                }
              />
            </SidebarLayout>
          </Container>
        </main>
      </Layout>
    )
  }
}

export default DocTemplate

export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    doc: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        description
        categories
        cms
        contributors {
          yamlId
          name
          twitter
          bio
          avatar
          url
        }
        featuredcontributor
        reviewed(formatString: "MMMM DD, YYYY")
        showtoc
        tags
        type
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
  }
`
