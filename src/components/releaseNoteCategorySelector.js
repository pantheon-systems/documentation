import React from "react"
import { activeReleaseNoteCategories } from "../data/releaseNoteCategories"
import { MenuButton } from "@pantheon-systems/pds-toolkit-react"
import { Link } from "gatsby"

const ReleaseNoteCategorySelector = () => {
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

  return (
    <>
      <MenuButton
        label="Categories"
        variant="secondary"
        menuItems={activeReleaseNoteCategories()}
      />
    </>
  )
}

export default ReleaseNoteCategorySelector
