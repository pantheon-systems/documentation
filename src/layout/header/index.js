import React from 'react';
import { Link } from 'gatsby';

import { Navbar, NavMenu } from '@pantheon-systems/pds-toolkit-react';

import { MOBILE_MENU_BREAKPOINT } from '../../vars/responsive';

import './style.css';

// Links for NavMenu component.
const mainNavigationLinks = [
  {
    label: 'Documentation',
    links: [
      {
        linkContent: (
          <Link id="home" to="/">
            Docs Home
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="get-started" to="/guides/getstarted">
            Get Started
          </Link>
        ),
      },

      {
        linkContent: (
          <Link id="workflows" to="/pantheon-workflow">
            Development Workflow
          </Link>
        ),
      },

      {
        linkContent: (
          <Link id="go-live" to="/go-live">
            Go Live
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="web-infra" to="/application-containers">
            Web Infrastructure
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="performance" to="/guides/account-mgmt/account">
            Manage Accounts and Workspaces
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="cli" to="/terminus">
            Command Line Interface (CLI)
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="front-end" to="/guides/decoupled">
            Front-End Sites and Starter Kits
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="support" to="/guides/support">
            Support and Troubleshooting
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="security" to="/guides/security">
            Security
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="certification" to="/certification">
            WebOps Certification
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="contribute" to="/contribute">
            About our Docs
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="pages-to-delete" to="/asdfasdf">
            Pages to Delete or reconsider
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="unassigned" to="/asdfasdfasdf">
            Unassigned
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="troubleshoot" to="/troubleshoot">
            Troubleshoot
          </Link>
        ),
      },

      {
        linkContent: (
          <Link id="release-notes" to="/release-notes">
            Release Notes (Changelog)
          </Link>
        ),
      },
    ],
  },
  {
    linkContent: (
      <a href="https://dashboard.pantheon.io/#support" target="_blank">
        Support
      </a>
    ),
  },
];

const Header = ({ page }) => (
  <>
    <a id="skip-to-main" className="pds-skiplink" href="#docs-main">
      Skip to main content
    </a>

    <Navbar
      logoLinkContent={
        <a href="https://pantheon.io" target="_blank" rel="nofollow">
          Pantheon Home
        </a>
      }
    >
      <NavMenu
        slot="items-left"
        ariaLabel="Main Navigation"
        menuItems={mainNavigationLinks}
        mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
      />
      <div slot="items-right" className="pds-button-group">
        <a
          className="pds-button pds-button--brand-secondary"
          href="https://dashboard.pantheon.io"
          target="_blank"
        >
          Log in
        </a>
        <a
          className="pds-button pds-button--brand"
          href="https://pantheon.io/register"
          target="_blank"
        >
          Get free account
        </a>
      </div>
    </Navbar>
  </>
);

export default Header;
