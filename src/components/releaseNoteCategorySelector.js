import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategories } from "../data/releaseNoteCategories.js"

import {
MenuButton,
  NavMenu,
} from "@pantheon-systems/pds-toolkit-react"


const releaseNoteCategoryMenuLinks = function (currentCategorySlug) {
  const menuArray = []

  // loop over the categories and add the displayName to the links array
  Object.keys(releaseNoteCategories).map((categorySlug, index) => (
    menuArray.push(
      {
        "label": releaseNoteCategories[categorySlug].displayName,
        "callback": () => { window.location.href = `/release-notes/${categorySlug}` },
      }
    )
  ))
  return menuArray;
}

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

// Loop through the categories and create a list of links to each category.
const ReleaseNoteCategorySelector = (currentCategorySlug) => {
  return (
    <div>
      <div>
        and another way
        <NavMenu
        label="Categories"
          menuItems={releaseNoteCategoryLinks(currentCategorySlug)}
         />
      </div>

      <div>
        and another way
        <MenuButton
          label="Categories"
          menuItems={releaseNoteCategoryMenuLinks(currentCategorySlug)}
        />
      </div>

    </div>
  )
}

export default ReleaseNoteCategorySelector
