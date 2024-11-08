import React from 'react';
import { Link } from 'gatsby';
import getOmniItems from '../../components/omniSidebarNav/getOmniItems';

import { Navbar, NavMenu } from '@pantheon-systems/pds-toolkit-react';

import { MOBILE_MENU_BREAKPOINT } from '../../vars/responsive';

import './style.css';

const Header = ({ page }) => {
  const OmniLinks = getOmniItems().map((item) => {
    const theLink = React.createElement(Link, { to: item.link }, item.title);
    return {
      linkContent: theLink,
    };
  });

  // Links for NavMenu component.
  const mainNavLinks = [
    {
      label: 'Documentation',
      links: OmniLinks,
    },
    {
      linkContent: (
        <a href="https://dashboard.pantheon.io/#support" target="_blank">
          Support
        </a>
      ),
    },
  ];

  return (
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
          menuItems={mainNavLinks}
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
};

export default Header;
