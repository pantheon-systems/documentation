import { expect, test } from 'vitest'
import { sum } from './sum'
import { findSubMenuItemsToUse } from './helpers'

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
  const maximumParent = 'test'
  expect(findSubMenuItemsToUse(maximumParent, sampleItems)).toEqual({ link: 'test' })
  expect(sum(1, 2)).toBe(3)
})


// test('finds sub menu items to use', () => {
// //   const maximumParent = 'test'
// //   const NestedItems = [{link: 'test'}]
// //   expect(findSubMenuItemsToUse(maximumParent, NestedItems)).toEqual({link: 'test'})
//  }

