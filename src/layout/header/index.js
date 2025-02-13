import React from 'react';
import { Link } from 'gatsby';
import getOmniItems from '../../components/omniSidebarNav/getOmniItems';


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

      <div><h1>Testing</h1></div>

    </>
  );
};

export default Header;
