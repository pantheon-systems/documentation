import allGuides from './allGuidesQuery';
import React from 'react';
import { Link } from 'gatsby';
import { Icon } from '@pantheon-systems/pds-toolkit-react';

/**
 * Converts items into links recursively.
 *
 * @param {Object} item - The item to convert into a link.
 * @param {string} activePage - The active page link.
 * @returns {Object} - The converted item with link properties.
 */
const turnItemsIntoLinks = (item, activePage) => {
  var linkText = item.title;
  // If the link is external, add an icon to indicate that.
  // Internal links will start with a slash.
  if (item.link.startsWith('http')) {
    linkText = React.createElement(
      React.Fragment,
      null,
      item.title,
      ' ',
      React.createElement(Icon, { iconName: 'externalLink', iconSize: 'sm' }),
    );
  }

  return {
    isActive: item.link === activePage || item.link === '/' + activePage,
    links: item.children
      ? item.children.map((child) => turnItemsIntoLinks(child, activePage))
      : false,
    linkContent: React.createElement(Link, { to: item.link }, linkText),
  };
};

/**
 * Checks if an item or any of its children have a link that matches the active page.
 *
 * @param {Object} item - The item to check.
 * @param {string} activePage - The active page link.
 * @returns {boolean} - True if the item or any of its children have a link that matches the active page, false otherwise.
 */
function containsActiveLink(item, activePage) {
  if (item.link === '/' + activePage || item.link === activePage) {
    return true;
  } else if (item.children && item.children.length > 0) {
    for (let child of item.children) {
      if (containsActiveLink(child, activePage)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Returns the active section from the Omni sidebar navigation based on the active page.
 *
 * @param {string} activePage - The active page.
 * @param {Array} OmniItems - The array of Omni sidebar items.
 * @returns {Object|undefined} - The active section object or undefined if not found.
 */
const getOmniSidebarActiveSection = (activePage, OmniItems) => {
  if (OmniItems) {
    for (let item of OmniItems) {
      if (containsActiveLink(item, activePage)) {
        return item;
      }
    }
  }
  return undefined;
};

/**
 * Finds the sub-menu items to use based on the provided top level parent path.
 *
 * @param {string} topLevelParentPath - The top level parent path to search for.
 * @param {Array} NestedItems - The array of nested items to search within.
 * @returns {Object|undefined} - The sub-menu item that matches the top level parent path, or undefined if not found.
 */
const findSubMenuItemsToUse = function (topLevelParentPath, NestedItems) {
  for (let item of NestedItems) {
    if (item.link === topLevelParentPath) {
      return item;
    }
  }
  return undefined;
};

/**
 * Retrieve menu items based on a given directory path from all guides.
 *
 * @param {string} guideDirectory - The directory of the guide.
 * @param {Object} [AllGuides=allGuides()] - The object containing all the guides.
 * @returns {Object} - The guide directory object with its title, link, and children.
 */
const getGuideDirectory = (
  guideDirectory,
  overrideGuideTitle = '',
  AllGuides = allGuides(),
) => {
  const ChildItems = [];
  var guideTitle = '';
  for (let item of AllGuides.allGuides.edges) {
    if (item.node.fields.guide_directory === guideDirectory) {
      ChildItems.push({
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      });
    }
    if (item.node.fields.slug === '/' + guideDirectory) {
      guideTitle = item.node.frontmatter.title;
    }
  }

  return {
    link: ChildItems.length > 0 ? ChildItems[0].link : '/' + guideDirectory,
    // link: '/' + guideDirectory,
    // If there is an overrideGuideTitle, use that instead of the guideTitle
    title: overrideGuideTitle || guideTitle,
    children: ChildItems,
  };
};

const simpleLink = (link, title = '', children = []) => {
  const returning = {
    link: link,
    title: title || link,
  };

  if (children.length > 0) {
    returning.children = children;
  }
  return returning;
};

export {
  findSubMenuItemsToUse,
  getGuideDirectory,
  getOmniSidebarActiveSection,
  turnItemsIntoLinks,
  simpleLink,
};
