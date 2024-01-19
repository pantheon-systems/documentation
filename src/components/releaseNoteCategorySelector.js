import React from "react"
import releaseNoteCategoriesObject from "../../source/releasenotescategories/releaseNoteCategories.json"
import { MenuButton } from "@pantheon-systems/pds-toolkit-react"
import { Link } from "gatsby"

// Initialize the links array with the All Release Notes link and a separator.
const categoryMenuItems = [
  {
    isLink: true,
    linkContent: <Link to={`/release-notes`}>All Release Notes</Link>,
  },
  {
    isSeparator: true,
  },
]

// Map over the categories and add each to the links array.
releaseNoteCategoriesObject.categories.map((category) => {
  categoryMenuItems.push({
    isLink: true,
    linkContent: (
      <Link to={`/release-notes/${category.slug}`}>{category.displayName}</Link>
    ),
  })
})

// Create the menu button with the links array.
const ReleaseNoteCategorySelector = (currentCategorySlug) => {
  return (
    <MenuButton
      label="Categories"
      variant="secondary"
      menuItems={categoryMenuItems}
    />
  )
}

export default ReleaseNoteCategorySelector
