import { expect, test } from 'vitest';
// import {
//   findSubMenuItemsToUse,
//   getGuideDirectory,
//   getOmniSidebarActiveSection,
// } from './helpers';
// import AllGuides from './testfixtures/allGuides.testfixture';
// import guideDirectoryItems from './testfixtures/guideDirectoryItems.textfixture';
import omniItems from './testfixtures/omniItems.textfixture';
import { flattenOmniItems } from './reporting';
import allPaths from './testfixtures/allPaths.testfixture';
// import activeSection from './testfixtures/activeSection.testfixture';

const exceptions = ['https://certification.pantheon.io/', '/404.html'];




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

function InWrittenPathOrExceptions(linkPath, allowedExceptions = []) {


  const flattened = flattenOmniItems(omniItems);

  if (flattened.includes(linkPath) || allowedExceptions.includes(linkPath)) {
    return true;
  }
  else {
    return false;
  }
}

function calculateNumberOfPathsInMenu(ArrayOfPaths, allowedExceptions = []) {

  const pathsInMenuOrExceptions = [];
  const pathsNotInMenuOrExceptions = [];
  // Loop over flattened and check that each item is in allWrittenPaths
  for (let linkPath of ArrayOfPaths) {

    if (InWrittenPathOrExceptions(linkPath, allowedExceptions)) {
      pathsInMenuOrExceptions.push(linkPath);
    } else {
      pathsNotInMenuOrExceptions.push(linkPath);
    }
  }
    const percentageNotInMenu = (pathsNotInMenuOrExceptions.length / allPaths.length) * 100;
    return {
      'pathsInMenuOrExceptions': pathsInMenuOrExceptions,
      'pathsNotInMenuOrExceptions': pathsNotInMenuOrExceptions,
      'percentageNotInMenu': percentageNotInMenu,
      // Round up to the nearest whole number
      'percentageNotInMenuRoundedUp': Math.ceil(percentageNotInMenu),
    }
  }

test('Calculate the percentage of written paths that are not in the menu or exceptions', () => {
  // merge allWrittenPaths and exceptions
  const results = calculateNumberOfPathsInMenu(allPaths, exceptions);
  console.log(results.percentageNotInMenu);
  expect(results.pathsInMenuOrExceptions.length).toEqual(28);
  expect(results.pathsNotInMenuOrExceptions.length).toEqual(55);
  expect(results.percentageNotInMenuRoundedUp).toEqual(67);

});

