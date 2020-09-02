import Accordion from "../components/accordion"
import Alert from "../components/alert"
import Callout from "../components/callout"
import Card from "../components/card"
import CardGroup from "../components/cardGroup"
import Check from "../components/check.js"
import ChecklistItem from "../components/checklistItem"
import Color from "../components/color.js"
import DNSProviderDocs from "../components/dns-provider-docs.js"
import Download from "../components/download"
import DrushChangelog from "../components/drushChangelog"
import Enablement from "../components/enablement"
import Example from "../components/styleExample"
import ExternalLink from "../components/externalLink"
import GetFeedback from "../components/getFeedback"
import HeaderBody from "../components/headerBody"
import Icon from "../components/icon"
import Image from "../layout/image"
import Layout from "../layout/layout"
import LocaldevChangelog from "../components/localdevChangelog"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Partial from "../components/partial"
import Popover from "../components/popover"
import React from "react"
import ResourceSelector from "../components/resourceSelector"
import ReviewDate from "../components/reviewDate"
import SEO from "../layout/seo"
import TOC from "../components/toc"
import Tab from "../components/tab"
import TabList from "../components/tabList"
import Youtube from "../components/youtube"
import { graphql } from "gatsby"

const shortcodes = {
  Accordion,
  Alert,
  Callout,
  Card,
  CardGroup,
  Check,
  ChecklistItem,
  Color,
  DNSProviderDocs,
  Download,
  DrushChangelog,
  Enablement,
  Example,
  ExternalLink,
  Icon,
  Image,
  LocaldevChangelog,
  Partial,
  Popover,
  ResourceSelector,
  ReviewDate,
  Tab,
  TabList,
  Youtube,
}

class DocTemplate extends React.Component {
  componentDidMount() {
    $("[data-toggle=popover]").popover({
      trigger: "click",
      placement: "right",
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
    const node = this.props.data.doc
    const isoDate = this.props.data.date

    return (
      <Layout>
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/assets/images/default-thumb-doc.png"}
          categories={node.frontmatter.categories}
          tags={node.frontmatter.tags}
          reviewed={isoDate.frontmatter.reviewed}
          type={node.frontmatter.type}
        />
        <main id="doc">
          <div className="container doc-content-well">
            <article className="doc article col-md-9 md-70">
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
            <TOC title="Contents" />
            <GetFeedback
              formId="tfYOGoE7"
              page={"/" + node.fields.slug}
            />
          </div>
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
        getfeedbackform
        categories
        cms
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
