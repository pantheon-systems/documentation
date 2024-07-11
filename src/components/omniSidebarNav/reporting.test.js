import { expect, test } from 'vitest';
import omniItems from './testfixtures/omniItems.textfixture';
import { flattenOmniItems, calculateNumberOfPathsInMenu, InMenuOrExceptions, eliminateExceptions } from './reporting';
import allPaths from './testfixtures/allPaths.testfixture';
import { Link } from 'gatsby';



const exceptions = ['https://certification.pantheon.io/', '/404.html'];
const RegExExceptions = [
  // a regular expression that matches all paths that contain the '/contributors/' with the preceding and following slashes as well as more characters after the slash
  /.*\/contributors\/.*/,
];

test('Check that the deep array/object of onmiItems can be flattened and contains no duplicates', () => {
   const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.
  expect(flattened.length).toEqual(28);
});

// Check that exceptions can be removed from the list of all paths
test('Check that exceptions can be removed from the list of all paths', () => {
  const filteredWrittenPaths = eliminateExceptions(allPaths, exceptions, RegExExceptions);
  expect(filteredWrittenPaths).not.toContain('/404.html');
  expect(filteredWrittenPaths).not.toContain('/contributors/alexfornuto');
  expect(filteredWrittenPaths).not.toContain('/contributors/');
  expect(filteredWrittenPaths.length).toEqual(83);
});

// check that the percentage of unexceptioned paths not in the menu can be calculated
test('Check that the percentage of unexceptioned paths not in the menu can be calculated', () => {
  const filteredWrittenPaths = eliminateExceptions(allPaths, exceptions, RegExExceptions);
  const flattenedOmniItems = flattenOmniItems(omniItems);

// loop over all the filtered paths and check if they are in the menu
  const pathsNotInMenu = [];
  const pathsInMenu = [];
  for (let linkPath of filteredWrittenPaths) {
    if (!flattenedOmniItems.includes(linkPath)) {
      pathsNotInMenu.push(linkPath);
    }
    else {
      pathsInMenu.push(linkPath);
    }
  }
  // 83 filtered paths - 28 paths in the menu + 1 path that is in the menu but exteral to the site
  // 83 - 28 +1 = 56
  expect(pathsNotInMenu.length).toEqual(56);
  expect(pathsInMenu.length).toEqual(27);
//  expect(pathsNotInMenu.length).toEqual(56);

  const percentageInMenu = (pathsInMenu.length / filteredWrittenPaths.length) * 100;
  expect(Math.ceil(percentageInMenu)).toEqual(33);
});
















test('check that the exceptions to menu checking are processed correctly', () => {
  const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.


  // A random path that is not present. Especially when the the other args are empty.
  expect(InMenuOrExceptions('/asdfasdfasdf')).toEqual(false);
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
});




// I want the percentage of written paths (that are not exceptions) that are in the menu.







test('Check that all items in the flattened menu list are present in the list of all written paths', () => {
  const flattened = flattenOmniItems(omniItems);

  // merge allWrittenPaths and exceptions
  const allWrittenPathsAndExceptions = allPaths.concat(exceptions);
  // Loop over flattened and check that each item is in allWrittenPaths
  for (let item of flattened) {
    expect(allWrittenPathsAndExceptions).toContain(item);
  }
});



const results = calculateNumberOfPathsInMenu(allPaths, omniItems, exceptions);

test('Calculate the percentage of written paths that are not in the menu or exceptions', () => {
  // merge allWrittenPaths and exceptions
  console.log(results.percentageNotInMenu);
  expect(results.pathsInMenuOrExceptions.length).toEqual(28);
  expect(results.pathsNotInMenuOrExceptions.length).toEqual(65);
  expect(results.percentageNotInMenuRoundedUp).toEqual(70);
});

// test('Check that specific contributors are filtered out based on matching', () => {
//   // merge allWrittenPaths and exceptions
//   console.log(results.pathsNotInMenuOrExceptions);

//   expect(results.pathsNotInMenuOrExceptions).not.toContain('/contributors/alexfornuto');
// });

