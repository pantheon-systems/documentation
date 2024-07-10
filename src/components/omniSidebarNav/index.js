import React from 'react';
import Navbar from '../navbar';
import { SideNavCompact } from '@pantheon-systems/pds-toolkit-react';
import getOmniItems from './getOmniItems';
import {
  findSubMenuItemsToUse,
  getOmniSidebarActiveSection,
  turnItemsIntoLinks,
} from './helpers.js';

// @todo, run prettier one more time on this directory before removing it from the PR.

const OmniSidebarNav = ({
  activePage,
  fallbackItems = null,
  fallbackTitle = '',
  submenuPathToUse = '',
}) => {
  const OmniItems = getOmniItems();
  console.log('OmniItems', OmniItems);
  const menuItems = getOmniSidebarActiveSection(activePage, OmniItems);
  console.log('menuItems', menuItems);

  // If the caller is asking for a specific submenu, use that directly.
  if (submenuPathToUse.length > 0) {
    const submenuItems = findSubMenuItemsToUse(submenuPathToUse, OmniItems);
    const submenuLinks = turnItemsIntoLinks(submenuItems, activePage);
    return (
      <SideNavCompact
        headingText={submenuLinks.linkContent}
        menuItems={submenuLinks.links}
      />
    );
  } else if (menuItems) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    return (
      <SideNavCompact
        headingText={OmniLinks.linkContent}
        menuItems={OmniLinks.links}
      />
    );
  } else if (fallbackItems && fallbackItems.length > 0) {
    return (
      <Navbar
        title={fallbackTitle}
        activePage={activePage}
        items={fallbackItems}
      />
    );
  } else {
    return <div></div>;
  }
};

export default OmniSidebarNav;
