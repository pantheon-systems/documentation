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
import Navbar from "../components/navbar"
import NavButtons from "../components/navButtons"
import SEO from "../layout/seo"
import Releases from "../components/releases"
import TerminusVersion from "../components/terminusVersion"
import Download from "../components/download"
import Commands from "../components/commands"
import ReviewDate from "../components/reviewDate"
import Check from "../components/check.js"
import Partial from "../components/partial"

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
  Download,
  Partial,
  Commands,
  ReviewDate,
  Check,
}

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-certification",
    link: "/certification",
    title: "Certification Program",
  },
  {
    id: "docs-certification-chapter-0",
    link: "/certification/study-guide",
    title: "Introduction",
  },
  {
    id: "docs-certification-chapter-1",
    link: "/certification/study-guide/webops",
    title: "Chapter 1: WebOps",
  },
  {
    id: "docs-certification-chapter-2",
    link: "/certification/study-guide/platform",
    title: "Chapter 2: Pantheon Platform",
  },
  {
    id: "docs-certification-chapter-3",
    link: "/certification/study-guide/create",
    title: "Chapter 3: Site Creation",
  },
  {
    id: "docs-certification-chapter-4",
    link: "/certification/study-guide/cdn",
    title: "Chapter 4: Content Delivery Network",
  },
  {
    id: "docs-certification-chapter-5",
    link: "/certification/study-guide/cms",
    title: "Chapter 5: CMS Infrastructure",
  },
  {
    id: "docs-certification-chapter-6",
    link: "/certification/study-guide/deploy",
    title: "Chapter 6: The Deployment Pipeline",
  },
  {
    id: "docs-certification-chapter-7",
    link: "/certification/study-guide/people",
    title: "Chapter 7: Connecting People",
  },
  {
    id: "docs-certification-chapter-8",
    link: "/certification/study-guide/extend",
    title: "Chapter 8: Extend with CLI and Hooks",
  },
  {
    id: "docs-certification-chapter-9",
    link: "/certification/study-guide/automate",
    title: "Chapter 9: Additional Automation",
  },
  {
    id: "docs-certification-chapter-10",
    link: "/certification/study-guide/custom-upstreams",
    title: "Chapter 10: Custom Upstreams",
  }
]

class CertificationTemplate extends React.Component {
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
    const ifCommandsDate =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.terminusReleasesJson.published_at
        : node.frontmatter.reviewed
    const ifCommandsISO =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.jsonISO.published_at
        : isoDate.frontmatter.reviewed

    return (
      <Layout>
        <SEO
          title={node.frontmatter.subtitle + " | " + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/terminus-thumbLarge.png"}
          reviewed={ifCommandsISO}
          type={node.frontmatter.type}
        />
          <div className="container-fluid">
            <div className="row col-md-10 guide-nav manual-guide-toc-well">
              <Navbar
                title={node.frontmatter.title}
                items={items}
                activePage={node.fields.slug}
              />
              <main id="doc" className="certification terminus col-md-9 guide-doc-body">
                <div className="row guide-content-well">
                  <article
                    className={`col-xs-${contentCols} col-md-${contentCols}`}
                  >
                    <HeaderBody
                      title={node.frontmatter.title}
                      subtitle={node.frontmatter.subtitle}
                      description={node.frontmatter.description}
                      slug={node.fields.slug}
                      contributors={node.frontmatter.contributors}
                      featured={node.frontmatter.featuredcontributor}
                      editPath={node.fields.editPath}
                      reviewDate={ifCommandsDate}
                      isoDate={ifCommandsISO}
                    />
                    <MDXProvider components={shortcodes}>
                      <MDXRenderer>{node.body}</MDXRenderer>
                    </MDXProvider>
                    <NavButtons
                      prev={node.frontmatter.previousurl}
                      next={node.frontmatter.nexturl}
                    />
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
              </main>
            </div>
          </div>
        <GetFeedback formId="tfYOGoE7" page={"/" + node.fields.slug} />
      </Layout>
    )
  }
}

export default CertificationTemplate

export const pageQuery = graphql`
  query TerminusPageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
        editPath
      }
      frontmatter {
        title
        subtitle
        description
        showtoc
        contributors {
          yamlId
          name
          twitter
        }
        reviewed(formatString: "MMMM DD, YYYY")
        type
        previousurl
        nexturl
      }
      fileAbsolutePath
    }
    date: mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        reviewed
      }
    }
    terminusReleasesJson {
      published_at(formatString: "MMMM DD, YYYY")
    }
    jsonISO: terminusReleasesJson {
      published_at(formatString: "YYYY-MM-DD")
    }
  }
`
