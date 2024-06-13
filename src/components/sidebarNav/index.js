import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"

const SidebarNav = ({ title, activePage }) => {

// Infrastructure
// Release Workflow
// Account Governance
// Certification

  const pages = useStaticQuery(
    graphql`
      {
        allMdx(
          filter: {
            fileInfo: { absolutePath: { regex: "/.dns-providers/./" } }
            frontmatter: { draft: { ne: true } }
          }
          sort: { fields: frontmatter___title, order: ASC }
        ) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              provider
            }
          }
        }
      }
    `
  )



  const CertificationStudyGuideItems = [
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
  const CertificationStudyGuideLinks = CertificationStudyGuideItems.map((item) => {
    return {
      isActive: item.link === activePage,
      linkContent: <Link to={item.link}>
        {item.title}
      </Link>
    }
  })


  const DNSPages = pages.allMdx.nodes.map((page, i) => {

      return {
        isActive: page.fields.slug === activePage,
        linkContent: <Link to={page.fields.slug}>
          {page.frontmatter.provider}
        </Link>
      }


    })


  return (
    <div>
    <SideNavCompact
      headingText={title}
      menuItems={[
        {
          linkContent: <a href="/certification/study-guide">DNS Pages</a>,
          links: DNSPages
        },

        {
          linkContent: <a href="/certification/about">About the Certification Program</a>
        },

        {
          linkContent: <Link to="/certification/about">
            About again
          </Link>
        },

        {
          linkContent: <a href="/certification/exam">Taking the Exam</a>
        },
        {
          linkContent: <a href="/certification/study-guide">Study Guide</a>,
          links: CertificationStudyGuideLinks
        },
        {
          linkContent: <a href="https://certification.pantheon.io/">↗ Certification Directory</a>
        }
      ]}
    />
    </div>
  )
}

export default SidebarNav
