import { expect, test } from 'vitest';
import {
  findSubMenuItemsToUse,
  getGuideDirectory,
  getOmniSidebarActiveSection,
} from './helpers';
import AllGuides from './testfixtures/allGuides.testfixture';
import guideDirectoryItems from './testfixtures/guideDirectoryItems.textfixture';
import omniItems from './testfixtures/omniItems.textfixture';
import activeSection from './testfixtures/activeSection.testfixture';

test('finds sub menu to use', () => {
  const sampleItems = [
    {
      link: 'test',
    },
    {
      link: 'test2',
    },
  ];

  const parentPath = 'test';
  expect(findSubMenuItemsToUse(parentPath, sampleItems)).toEqual({
    link: 'test',
  });
});

test('Check that the items for a specific guide directory path are correct', () => {
  const guideDirectory = 'guides/decoupled/wp-backend-starters';
  expect(getGuideDirectory(guideDirectory, '', AllGuides)).toEqual(
    guideDirectoryItems,
  );
});

test('Check that the active menu can be found', () => {
  const activePage = '/guides/decoupled/wp-backend-starters/create';
  expect(getOmniSidebarActiveSection(activePage, omniItems)).toEqual(
    activeSection,
  );
});
