import React from "react"
import releaseNoteCategoriesObject from "../../source/releasenotescategories/releaseNoteCategories.json"
import { navigate } from "@reach/router"
import {
MenuButton,
  NavMenu,
} from "@pantheon-systems/pds-toolkit-react"


/*
const releaseNoteCategoryLinks = function (currentCategorySlug) {
  const links = [];
  // loop over the categories and add the displayName to the links array
  Object.keys(releaseNoteCategories).map((categorySlug, index) => (
    links.push(
      {
        linkContent: (
          <Link id={`${categorySlug}`} to={`/release-notes/${categorySlug}`}>
          {
              releaseNoteCategories[categorySlug].displayName
          }
          </Link>
        ),
      },
      )
  ))
  return links;
}
*/

const releaseNoteCategoryLinksFromJson = function () {

  const menuItems = [
    {
      "label": "All Release Notes",
      "callback": () => { window.location.href = `/release-notes` },
    },
    {
      "isSeparator": true
    }
  ];
  // loop over the categories and add the displayName to the links array
  releaseNoteCategoriesObject.categories.forEach((category) => {

    menuItems.push(
      {
        "label": category.displayName,
        "callback": () => { navigate( `/release-notes/${category.slug}`  ) },
      }
    )
  })

  return menuItems;
}

// Loop through the categories and create a list of links to each category.
const ReleaseNoteCategorySelector = (currentCategorySlug) => {
  return (
    <MenuButton
      label="Categories"
      menuItems={releaseNoteCategoryLinksFromJson()}
    />
  )
}

// Loop through the categories and create a list of links to each category.
const ReleaseNoteCategorySelectorNav = (currentCategorySlug) => {
  return (
        <NavMenu
          label="Categories"
          menuItems={releaseNoteCategoryLinks(currentCategorySlug)}
        />
  )
}

export default ReleaseNoteCategorySelector
