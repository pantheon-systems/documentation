import React from 'react';
import { SidebarNav, turnItemsIntoLinks } from '../sidebarNav';
import Navbar from '../navbar';
import getOmniItems from './getOmniItems';
import { findSubMenuItemsToUse, getOmniSidebarActiveSection } from './helpers.js';

const OmniSidebarNav = ({
  activePage,
  fallbackItems = null,
  fallbackTitle = '',
  submenuPathToUse = '',
}) => {
  const menuItems = [getOmniSidebarActiveSection({ activePage })];
  const OmniItems = getOmniItems();

  // If the caller is asking for a specific submenu, use that directly.
  if (submenuPathToUse.length > 0) {
    const submenuItems = [findSubMenuItemsToUse(submenuPathToUse, OmniItems)];
    const submenuLinks = turnItemsIntoLinks(submenuItems, activePage);
    return (
      <SidebarNav
        title={submenuLinks[0].linkContent}
        links={submenuLinks[0].links}
      />
    );
  }
  // @todo, checking the 0 property is a hack, need to fix this.
  else if (menuItems[0]) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    console.log('menuItems', menuItems);
    console.log('OmniLinks', OmniLinks);
    return (
      <SidebarNav title={OmniLinks[0].linkContent} links={OmniLinks[0].links} />
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
