import React from "react"
import { graphql } from "gatsby"
import { SidebarLayout } from "@pantheon-systems/pds-toolkit-react"
import GuideLayout from "../layout/GuideLayout"
import SEO from "../layout/seo"
import SearchBar from "../layout/SearchBar"
import HeaderBody from "../components/headerBody"
import GetFeedback from "../components/getFeedback"
import SidebarNav from "../components/sidebarNav"
import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"

import NavButtons from "../components/navButtons"
import TOC from "../components/toc"
import MdxWrapper from "../components/mdxWrapper"

// @TODO relocate this list
// - To a YAML file and use GraphQL to pull data.
// - To a GraphQL query order by frontmatter weight/order/index field.
const items = [
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
  },
]

class CertificationTemplate extends React.Component {
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
          <SidebarNav
          slot="guide-menu"
          title="WebOps Certification"
          activePage={node.fields.slug} />
        <ContentLayoutType slot="guide-content">
          <SearchBar slot="content" page="default" />

          <main
            slot="content"
            id="docs-main"
            tabIndex="-1"
            className="certification terminus"
          >
            <article className="doc guide-doc-body">
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

              <MdxWrapper mdx={node.body} />

              <NavButtons
                prev={node.frontmatter.previousurl}
                next={node.frontmatter.nexturl}
              />
            </article>
          </main>
          {hasTOC && <TOC slot="sidebar" title="Contents" />}
        </ContentLayoutType>

        <GetFeedback formId="tfYOGoE7" page={"/" + node.fields.slug} />
      </GuideLayout>
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
