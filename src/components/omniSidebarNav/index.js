import React from 'react';
import Navbar from '../navbar';
import { SideNavCompact } from '@pantheon-systems/pds-toolkit-react';
import getOmniItems from './getOmniItems';
import {
  findSubMenuItemsToUse,
  getOmniSidebarActiveSection,
  turnItemsIntoLinks,
} from './helpers.js';

/* Reporting debugging code.
import {
  flattenOmniItems,
  CalculateFilteredPathsInMenu,
  filteredWrittenPaths
} from './reporting';
*/

import './style.css';

const OmniSidebarNav = ({
  activePage,
  fallbackItems = null,
  fallbackTitle = '',
  submenuPathToUse = '',
}) => {
  const OmniItems = getOmniItems();

  /* Reporting debug code
  const flattenedOmniItems = flattenOmniItems(OmniItems);
  const results = CalculateFilteredPathsInMenu(
    filteredWrittenPaths,
    flattenedOmniItems,
);
  console.log(results);
  */

  const menuItems = getOmniSidebarActiveSection(activePage, OmniItems);

  // If the caller is asking for a specific submenu, use that directly.
  if (submenuPathToUse.length > 0) {
    const submenuItems = findSubMenuItemsToUse(submenuPathToUse, OmniItems);
    const submenuLinks = turnItemsIntoLinks(submenuItems, activePage);
    return (
      <SideNavCompact
        className="sidenav-compact"
        headingText={submenuLinks.linkContent}
        menuItems={submenuLinks.links}
      />
    );
  } else if (menuItems) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    return (
      <SideNavCompact
        className="sidenav-compact"
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
