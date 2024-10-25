import { expect, test } from 'vitest';
import omniItems from './testfixtures/omniItems.textfixture';
import {
  flattenOmniItems,
  InMenuOrExceptions,
  eliminateExceptions,
  CalculateFilteredPathsInMenu,
} from './reporting';
import allPaths from './testfixtures/allPaths.testfixture';

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
  const filteredWrittenPaths = eliminateExceptions(
    allPaths,
    exceptions,
    RegExExceptions,
  );
  expect(filteredWrittenPaths).not.toContain('/404.html');
  expect(filteredWrittenPaths).not.toContain('/contributors/alexfornuto');
  expect(filteredWrittenPaths).not.toContain('/contributors/');
  expect(filteredWrittenPaths.length).toEqual(83);
});

// check that the percentage of unexceptioned paths not in the menu can be calculated
test('Check that the percentage of unexceptioned paths not in the menu can be calculated', () => {
  const filteredWrittenPaths = eliminateExceptions(
    allPaths,
    exceptions,
    RegExExceptions,
  );
  const flattenedOmniItems = flattenOmniItems(omniItems);
  const results = CalculateFilteredPathsInMenu(
    filteredWrittenPaths,
    flattenedOmniItems,
  );

  // 83 filtered paths - 28 paths in the menu + 1 path that is in the menu but exteral to the site
  // 83 - 28 +1 = 56
  expect(results.pathsNotInMenu.length).toEqual(56);
  expect(results.pathsInMenu.length).toEqual(27);

  expect(results.percentageInMenuRoundedUp).toEqual(33);
});

test('check that the exceptions to menu checking are processed correctly', () => {
  const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.

  // A random path that is not present. Especially when the the other args are empty.
  expect(InMenuOrExceptions('/asdfasdfasdf')).toEqual(false);
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(
    true,
  );
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(
    true,
  );
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
