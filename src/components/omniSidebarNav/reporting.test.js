import { expect, test } from 'vitest';
// import {
//   findSubMenuItemsToUse,
//   getGuideDirectory,
//   getOmniSidebarActiveSection,
// } from './helpers';
// import AllGuides from './testfixtures/allGuides.testfixture';
// import guideDirectoryItems from './testfixtures/guideDirectoryItems.textfixture';
import omniItems from './testfixtures/omniItems.textfixture';
import allPaths from './testfixtures/allPaths.testfixture';
// import activeSection from './testfixtures/activeSection.testfixture';

const exceptions = ['https://certification.pantheon.io/'];


function flattenOmniItems(menuItems) {
  // loop over the omniItems and make a flattened array of all the links
  // this function should be recursive.
  // return the array
  let flattened = [];
  for (let item of menuItems) {
    flattened.push(item.link);
    if (item.children) {
       flattened = flattened.concat(flattenOmniItems(item.children));
    }
  }

  // return flattened with duplicates removed
  return [...new Set(flattened)];
}


test('Check that the deep array/object of onmiItems can be flattened and contains no duplicates', () => {

   const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.
  expect(flattened.length).toEqual(28);
});


test('Check that all items in the flattened menu list are present in the list of all written paths', () => {
  const flattened = flattenOmniItems(omniItems);

  // merge allWrittenPaths and exceptions
  const allWrittenPathsAndExceptions = allPaths.concat(exceptions);
  // Loop over flattened and check that each item is in allWrittenPaths
  for (let item of flattened) {
    expect(allWrittenPathsAndExceptions).toContain(item);
  }
});

function InWrittenPathOrExceptions(linkPath) {


  const flattened = flattenOmniItems(omniItems);

  if (flattened.includes(linkPath) || exceptions.includes(linkPath)) {
    return true;
  }
  else {
    return false;
  }
}


test('Calculate the percentage of written paths that are not in the menu or exceptions', () => {
  // merge allWrittenPaths and exceptions

  const pathsInMenu = [];
  const pathsNotInMenu = [];
  // Loop over flattened and check that each item is in allWrittenPaths
  for (let linkPath of allPaths) {

    if (InWrittenPathOrExceptions(linkPath)) {
      pathsInMenu.push(linkPath);
      console.log('in menu', linkPath);
    } else {
      pathsNotInMenu.push(linkPath);
      console.log('not in menu', linkPath);
    }
  }

  expect(pathsInMenu.length).toEqual(27);
  expect(pathsNotInMenu.length).toEqual(62);
});

