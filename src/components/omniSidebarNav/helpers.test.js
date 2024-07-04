import { expect, test } from 'vitest';
import { sum } from './sum';
import { findSubMenuItemsToUse, getTitleForGuideDirectory, getGuideDirectory } from './helpers';
import AllGuides from './allGuides.testfixture';
import guideDirectoryItems from './testfixtures/guideDirectoryItems';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)

})

const sampleItems = [
  {
    link: 'test',
  },
  {
    link: 'test2',
  },
]

test('finds sub menu to use', () => {
  const parentPath = 'test'
  expect(findSubMenuItemsToUse(parentPath, sampleItems)).toEqual({ link: 'test' })
  expect(sum(1, 2)).toBe(3)
})


test('Find the guide title by directory', () => {
  const guideDirectory = "guides/account-mgmt/account";
  expect(getTitleForGuideDirectory(guideDirectory, AllGuides.allGuides.edges)).toEqual("Manage Your Account")
})

test('Check that the items for a specific guide directory path are correct', () => {
  const guideDirectory = "guides/decoupled/wp-backend-starters";
  expect(getGuideDirectory(guideDirectory, AllGuides)).toEqual(guideDirectoryItems)
})
