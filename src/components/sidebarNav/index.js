import React from "react"

import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"

const SidebarNav = ({ activePage }) => {

// Infrastructure
// Release Workflow
// Account Governance
// Certification


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
      linkContent: <a href={item.link}>{item.title}</a>
    }
  })

  return (
    <div>Compact?
    <SideNavCompact
      headingText={<a href="#">Secondary menu</a>}
      menuItems={[
        {
          linkContent: <a href="#">Onboarding</a>
        },
        {
          linkContent: <a href="/certification">Certification</a>,

          links: [
            {
              linkContent: <a href="/test">Study Guide</a>,
              links: CertificationStudyGuideLinks
            },
            {
              linkContent: <a href="/test">Item 2b</a>
            }
          ]


        },
        {
          linkContent: <a href="#">Policies and benefits</a>,
          links: [
            {
              linkContent: <a href="/test">Item 2a</a>
            },
            {
              linkContent: <a href="/test">Item 2b</a>
            }
          ]
        },
        {
          linkContent: <a href="/test">Tools directory</a>,
          links: [
            {
              linkContent: <a href="/test">Item 3a</a>,
              links: [
                {
                  linkContent: <a href="/test">Item 3ai</a>
                },
                {
                  linkContent: <a href="/test">Item 3aii</a>
                }
              ]
            },
            {
              linkContent: <a href="/test">Item 3b</a>
            },
            {
              linkContent: <a href="/test">Item 3c</a>
            }
          ]
        },
        {
          linkContent: <a href="/test">Learning resources</a>
        },
        {
          linkContent: <a href="/test">Communications resources</a>
        },
        {
          linkContent: <a href="/test">Engagement survey</a>
        }
      ]}
    />
    </div>
  )
}

export default SidebarNav
