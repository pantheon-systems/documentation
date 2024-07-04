import { expect, test } from 'vitest';
import { findSubMenuItemsToUse, getGuideDirectory } from './helpers';
import AllGuides from './testfixtures/allGuides.testfixture';
import guideDirectoryItems from './testfixtures/guideDirectoryItems';

test('finds sub menu to use', () => {

  const sampleItems = [
    {
      link: 'test',
    },
    {
      link: 'test2',
    },
  ]

  const parentPath = 'test'
  expect(findSubMenuItemsToUse(parentPath, sampleItems)).toEqual({ link: 'test' })
})


test('Check that the items for a specific guide directory path are correct', () => {
  const guideDirectory = "guides/decoupled/wp-backend-starters";
  expect(getGuideDirectory(guideDirectory, AllGuides)).toEqual(guideDirectoryItems)
})
