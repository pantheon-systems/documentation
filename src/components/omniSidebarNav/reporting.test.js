import { expect, test } from 'vitest';
import omniItems from './testfixtures/omniItems.textfixture';
import { flattenOmniItems, calculateNumberOfPathsInMenu, InMenuOrExceptions } from './reporting';
import allPaths from './testfixtures/allPaths.testfixture';
// import activeSection from './testfixtures/activeSection.testfixture';


const exceptions = ['https://certification.pantheon.io/', '/404.html'];


test('Check that the deep array/object of onmiItems can be flattened and contains no duplicates', () => {
   const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.
  expect(flattened.length).toEqual(28);
});

test('check that the exceptions to menu checking are processed correctly', () => {
  const flattened = flattenOmniItems(omniItems);
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.


  // A random path that is not present. Especially when the the other args are empty.
  expect(InMenuOrExceptions('/asdfasdfasdf')).toEqual(false);

  //
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
});


const RegExExceptions = [

  //'*contibutors*'

  // a regular expression that matches all paths that contain the '/contributors/' with the preceding and following slashes as well as more characters after the slash
  /.*\/contributors\/.*/,
];

// I want the percentage of written paths (that are not exceptions) that are in the menu.

function eliminateExceptions(allPaths, exceptions, RegExExceptions = []) {
  return allPaths.filter(path => {
    for (let exception of exceptions) {
      if (path.includes(exception)) {
        return false;
      }
    }
    for (let RegExException of RegExExceptions) {
      console.log(RegExException);
      if (path.match(RegExException)) {
        return false;
      }
    }
    return true;
  });
}


test('test the set of all paths can be reduced by eliminating exceptions', () => {
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.
  const filteredWrittenPaths = eliminateExceptions(allPaths, exceptions, RegExExceptions);

  console.log(filteredWrittenPaths);

  expect(filteredWrittenPaths).not.toContain('/contributors/alexfornuto');
  expect(filteredWrittenPaths).not.toContain('/contributors/');


  expect(filteredWrittenPaths.length).toEqual(83);

});

test('asdfasdfasfd', () => {
  // It just so happens that the testfixtures/omniItems.textfixture.js has 28 unique links.

  const flattened = flattenOmniItems(omniItems);

  // A random path that is not present. Especially when the the other args are empty.
  expect(InMenuOrExceptions('/asdfasdfasdf')).toEqual(false);

  //
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
  expect(InMenuOrExceptions('/certification', flattened, exceptions)).toEqual(true);
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

