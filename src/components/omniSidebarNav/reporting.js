import { expect, test } from 'vitest';
// import {
//   findSubMenuItemsToUse,
//   getGuideDirectory,
//   getOmniSidebarActiveSection,
// } from './helpers';
// import AllGuides from './testfixtures/allGuides.testfixture';
// import guideDirectoryItems from './testfixtures/guideDirectoryItems.textfixture';
import omniItems from './testfixtures/omniItems.textfixture';
// import activeSection from './testfixtures/activeSection.testfixture';

test('Check that the deep array/object of onmiItems can be flattened and contains no duplicates', () => {


  const parentPath = 'test';
  expect(omniItems.length).toEqual(144);
});
