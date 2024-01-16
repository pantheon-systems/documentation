import React from "react"
import releaseNoteCategoriesObject from "../../source/releasenotescategories/releaseNoteCategories.json"
import { MenuButton } from "@pantheon-systems/pds-toolkit-react"
import { Link } from "gatsby"

const releaseNoteCategoryLinks = function () {
  const menuItems = [
    {
      isLink: true,
      linkContent: <Link to={`/release-notes`}>All Release Notes</Link>,
    },
    {
      isSeparator: true,
    },
  ]
  // loop over the categories and add each to the links array
  releaseNoteCategoriesObject.categories.forEach((category) => {
    menuItems.push({
      isLink: true,
      linkContent: (
        <Link to={`/release-notes/${category.slug}`}>
          {category.displayName}
        </Link>
      ),
    })
  })

  return menuItems
}

// Loop through the categories and create a list of links to each category.
const ReleaseNoteCategorySelector = (currentCategorySlug) => {
  return (
    <MenuButton
      label="Categories"
      variant="secondary"
      menuItems={releaseNoteCategoryLinks()}
    />
  )
}

export default ReleaseNoteCategorySelector
