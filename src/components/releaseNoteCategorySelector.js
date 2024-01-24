import React from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { MenuButton } from "@pantheon-systems/pds-toolkit-react"
import { Link } from "gatsby"

const ReleaseNoteCategorySelector = () => {
  // Initialize the links array with the All Release Notes link and a separator.
  const categoryMenuItems = [
    {
      isLink: true,
      linkContent: <Link to={`/release-notes`}>All release notes</Link>,
    },
    {
      isSeparator: true,
    },
  ]

  // Function to create menu items for each valid category in use.
  const createCategoryMenuItems = (categoryObjects) => {
    categoryObjects.map((category) => {
      categoryMenuItems.push({
        isLink: true,
        linkContent: (
          <Link to={`/release-notes/${category.slug}`}>
            {category.displayName}
          </Link>
        ),
      })
    })
  }

  // Get the active categories data.
  const activeCategories = JSON.parse(activeReleaseNoteCategories())

  // Create the menu items.
  createCategoryMenuItems(activeCategories)

  return (
    <>
      <MenuButton
        label="Filter by category"
        variant="secondary"
        menuItems={categoryMenuItems}
      />
    </>
  )
}

export default ReleaseNoteCategorySelector
