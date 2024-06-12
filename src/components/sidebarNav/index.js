import React from "react"

import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"

const SidebarNav = ({ activePage }) => {

// Infrastructure
// Release Workflow
// Account Governance
// Certification


  return (
    <div>Compact?
    <SideNavCompact
      headingText={<a href="#">Secondary menu</a>}
      menuItems={[
        {
          linkContent: <a href="#">Onboarding</a>
        },
        {
          linkContent: <a href="#">Policies and benefits</a>,
          links: [
            {
              isActive: true,
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
