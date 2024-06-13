import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"

const SidebarNav = ({ title, activePage }) => {

// Infrastructure
// Release Workflow
// Account Governance
// Certification




/*
  const SecureDev = useStaticQuery(
    graphql`
      {

        sd: allMdx(
      filter: {
        fileAbsolutePath: { ne: null }
        fields: { guide_directory: { eq: "guides/secure-development" } }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [fileAbsolutePath], order: ASC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            guide_directory
          }
          frontmatter {
            subtitle
          }
        }
      }
    }

      }
    `
  )
console.log("SecureDev");
console.log(SecureDev);

    const SecureDevLinks = SecureDev.sd.edges.map((page, i) => {

            return {
 isActive: page.node.fields.slug === activePage,
              linkContent: <Link to={page.node.fields.slug}>
                  {page.node.frontmatter.subtitle}
                </Link>
              }
        })
*/
  const CertificationItems = [
    {
      link: "/certification/about",
      title: "About the Certification Program",
    },
    {
      link: "/certification/exam",
      title: "Taking the Exam",
    },
    {
      link: "/certification/study-guide",
      title: "Introduction",
    },
    {
      link: "/certification/study-guide/webops",
      title: "Chapter 1: WebOps",
    },
    {
      link: "/certification/study-guide/platform",
      title: "Chapter 2: Pantheon Platform",
    },
    {
      link: "/certification/study-guide/create",
      title: "Chapter 3: Site Creation",
    },
    {
      link: "/certification/study-guide/cdn",
      title: "Chapter 4: Content Delivery Network",
    },
    {
      link: "/certification/study-guide/cms",
      title: "Chapter 5: CMS Infrastructure",
    },
    {
      link: "/certification/study-guide/deploy",
      title: "Chapter 6: The Deployment Pipeline",
    },
    {
      link: "/certification/study-guide/people",
      title: "Chapter 7: Connecting People",
    },
    {
      link: "/certification/study-guide/extend",
      title: "Chapter 8: Extend with CLI and Hooks",
    },
    {
      link: "/certification/study-guide/automate",
      title: "Chapter 9: Additional Automation",
    },
    {
      link: "/certification/study-guide/custom-upstreams",
      title: "Chapter 10: Custom Upstreams",
      children: [
        {
          link: "/certification/study-guide/custom-upstreams",
          title: "Introduction",
        },
        {
          link: "/certification/study-guide/custom-upstreams/creating",
          title: "Creating a Custom Upstream",
        },
        {
          link: "/certification/study-guide/custom-upstreams/using",
          title: "Using a Custom Upstream",
        }
      ]
    },
  ]

function turnItemIntoLink(item, activePage) {
  return {
    isActive: item.link === activePage,
    links: item.children ? item.children.map((child) => turnItemIntoLink(child, activePage)) : false,
    linkContent: <Link to={item.link}>
      {item.title}
    </Link>
  }
}




  const CertificationLinks = CertificationItems.map((item) => {
    return turnItemIntoLink(item, activePage);
  })




  return (
    <div>
    <SideNavCompact
      headingText={title}
      menuItems={[
        // {
        //   linkContent: <a href="/certification/study-guide">Secure Dev</a>,
        //   links: SecureDevLinks

        // },


        {
          linkContent: <a href="/certification/study-guide">Study Guide</a>,
          links: CertificationLinks
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
