import React from 'react';
import { Link } from 'gatsby';
import getOmniItems from '../../components/omniSidebarNav/getOmniItems';

import { DocsNavbar } from '../../pds-middleware/DocsNavbar/DocsNavbar';

import { NavMenu } from '@pantheon-systems/pds-toolkit-react';

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

      <p>Test</p>
    </>
  );
};

export default Header;
