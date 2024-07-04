
import allGuides from './allGuidesQuery';

// Searches through the top level items find the subdata structure that
// matches the parent path requested.
// todo, rename "maximumParent" to something better.
const findSubMenuItemsToUse = function (maximumParent, NestedItems) {
  for (let item of NestedItems) {
    if (item.link === maximumParent) {
      return item;
    }
  }
  return undefined;
}

function getChildrenForGuideDirectory(AllTheGuides, guideDirectory) {
  const ChildItems = [];
  for (let item of AllTheGuides) {
    if (item.node.fields.guide_directory === guideDirectory) {
      ChildItems.push({
        link: item.node.fields.slug,
        title: item.node.frontmatter.subtitle,
      });
    }
  }
  return ChildItems;
}

// Find the title of a guide directory by the directory name.
const getTitleForGuideDirectory = function (guideDirectory, AllTheGuides) {
  for (let item of AllTheGuides) {
    if (item.node.fields.slug === '/' + guideDirectory) {
      return item.node.frontmatter.title;
    }
  }
}

// return an item list for a guide directory.
// guideDirectory is the directory name of the guide.
// AllGuides is the result of the allGuides query.
// For testing purposes, AllGuides can be directly set with the fixture
// allGuides.testfixtures.js
const getGuideDirectory = (guideDirectory, AllGuides = allGuides()) => {
  return {
    link: '/' + guideDirectory,
    title: getTitleForGuideDirectory(guideDirectory, AllGuides.allGuides.edges),
    children: getChildrenForGuideDirectory(
      AllGuides.allGuides.edges,
      guideDirectory,
    ),
  };
};


export { findSubMenuItemsToUse, getGuideDirectory, getTitleForGuideDirectory };
