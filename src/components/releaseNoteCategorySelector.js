import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategories } from "../data/releaseNoteCategories.js"

import {
MenuButton,
  NavMenu,
} from "@pantheon-systems/pds-toolkit-react"


const mainNavigationLinks = [
  {
    label: {
      linkContent: (
        <Link id="home" to="/">
          Docs Home
        </Link>
      ),
    },
    links: [
      {
        linkContent: (
          <Link id="home" to="/">
            Docs Home
          </Link>
        ),
      },
      {
        linkContent: (
          <Link id="get-started" to="/get-started">
            Get Started
          </Link>
        ),
      },
]}

]


const releaseNoteCategoryLinks = function () {

  const links = [

  ];
  // loop over the categories and add the displayName to the links array
  Object.keys(releaseNoteCategories).map((categorySlug, index) => (
    links.push(


      {
        linkContent: (
          <Link id="get-started" to="/get-started">
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
   These are all the categories!

<ul>


{

// Loop through the categories and create a list of links to each category.
Object.keys(releaseNoteCategories).map((categorySlug, index) => (
  <li key={index}>
    <Link
      to={`/release-notes/${categorySlug}`}

      style={{ 'color': releaseNoteCategories[categorySlug].color }}
    >
      { // If the current category is the same as the category we're looping through, add a checkmark.
        currentCategorySlug === categorySlug &&
        <span role="img" aria-label="Current category">✅</span>
      }

      {releaseNoteCategories[categorySlug].displayName}


    </Link>
  </li>
))
}
</ul>

      <div>
        and another way
        <NavMenu
        label="Categories"
          menuItems={releaseNoteCategoryLinks()}
         />


      </div>




    </div>







  )
}

export default ReleaseNoteCategorySelector
