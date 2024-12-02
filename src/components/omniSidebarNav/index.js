import React from 'react';
import Navbar from '../navbar';
import { SideNavCompact } from '@pantheon-systems/pds-toolkit-react';
import getOmniItems from './getOmniItems';
import {
  findSubMenuItemsToUse,
  getOmniSidebarActiveSection,
  turnItemsIntoLinks,
} from './helpers.js';

// @todo, remove the reporting before merging this PR.
import allWrittenPaths from './all-written-paths.js';
import {
  flattenOmniItems,
  CalculateFilteredPathsInMenu,
  eliminateExceptions,
} from './reporting';

import './style.css';

// @todo, run prettier one more time on this directory before removing it from the PR.

const OmniSidebarNav = ({
  activePage,
  fallbackItems = null,
  fallbackTitle = '',
  submenuPathToUse = '',
}) => {
  const OmniItems = getOmniItems();

  const exceptions = [
    'https://certification.pantheon.io/',
    '/404.html',
    '/404/',
  ];
  const RegExExceptions = [
    // a regular expression that matches all paths that contain the '/contributors/' with the preceding and following slashes as well as more characters after the slash
    /.*\/contributors\/.*/,
    /.*\/release-notes\/.*/,
    /.*\/iframeembeds\/.*/,
    /.*\/search\/.*/,
    /.*\/terminus\/commands\/.*/,
  ];

  const filteredWrittenPaths = eliminateExceptions(
    allWrittenPaths,
    exceptions,
    RegExExceptions,
  );
  const flattenedOmniItems = flattenOmniItems(OmniItems);
  const results = CalculateFilteredPathsInMenu(
    filteredWrittenPaths,
    flattenedOmniItems,
  );

  // const results = calculateNumberOfPathsInMenu(allWrittenPaths, OmniItems, exceptions);

  console.log(results);

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
