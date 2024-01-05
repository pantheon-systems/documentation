import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import GuideLayout from "../layout/GuideLayout"
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
import SearchBar from "../layout/SearchBar"
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
  Releases,
  TerminusVersion,
  Download,
  Partial,
  Commands,
  ReviewDate,
  Check,
  Wistia,
}

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
  {
    id: "docs-terminus",
    link: "/terminus",
    title: "Introduction",
  },
  {
    id: "docs-terminus-install",
    link: "/terminus/install",
    title: "Install and Update Terminus",
  },
  {
    id: "docs-terminus-examples",
    link: "/terminus/examples",
    title: "Get Started",
  },
  {
    id: "docs-terminus-commands",
    link: "/terminus/commands",
    title: "Command Directory",
  },
  {
    id: "docs-terminus-scripting",
    link: "/terminus/scripting",
    title: "Scripting with Terminus",
  },
  {
    id: "docs-terminus-plugins",
    link: "/terminus/plugins",
    title: "Install Plugins",
  },
  {
    id: "docs-terminus-directory",
    link: "/terminus/directory",
    title: "Plugin Directory",
  },
  {
    id: "docs-terminus-create",
    link: "/terminus/create",
    title: "Create Terminus Plugins",
  },
  {
    id: "docs-terminus-configuration",
    link: "/terminus/configuration",
    title: "Terminus Configuration File",
  },

  {
    id: "docs-supported-terminus",
    link: "/terminus/supported-terminus",
    title: "Supported Terminus and PHP Versions",
  },

  {
    id: "docs-terminus-updates",
    link: "/terminus/updates",
    title: "Current Terminus Release and Changelog",
  },

  {
    id: "docs-terminus-terminus-3-0",
    link: "/terminus/terminus-3-0",
    title: "Terminus 3",
  },
]

class TerminusTemplate extends React.Component {
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
    const isoDate = this.props.data.date
    const ifCommandsDate =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.terminusReleasesJson.published_at
        : node.frontmatter.reviewed
    const ifCommandsISO =
      node.fields.slug == "/terminus/commands"
        ? this.props.data.jsonISO.published_at
        : isoDate.frontmatter.reviewed

    // Preprocess content region layout if has TOC or not.
    const hasTOC = node.frontmatter.showtoc
    const ContainerDiv = ({ children }) => (
      <div className="content-wrapper">{children}</div>
    )
    const ContentLayoutType = hasTOC ? SidebarLayout : ContainerDiv

    return (
      <GuideLayout>
        <SEO
          slot="seo"
          title={node.frontmatter.subtitle + " | " + node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
          authors={node.frontmatter.contributors}
          image={"/images/assets/terminus-thumbLarge.png"}
          reviewed={ifCommandsISO}
          type={node.frontmatter.type}
        />
        <Navbar
          slot="guide-menu"
          title={node.frontmatter.title}
          items={items}
          activePage={node.fields.slug}
        />
        <ContentLayoutType slot="guide-content">
          <SearchBar slot="content" page="default" />
          <main
            slot="content"
            id="docs-main"
            tabindex="-1"
            className="terminus"
          >
            <article className="doc guide-doc-body pds-spacing-pad-block-end-xl">
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
            </article>
          </main>
          {hasTOC && <TOC slot="sidebar" title="Contents" />}
        </ContentLayoutType>

        <GetFeedback formId="tfYOGoE7" page={"/" + node.fields.slug} />
      </GuideLayout>
    )
  }
}

export default TerminusTemplate

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
