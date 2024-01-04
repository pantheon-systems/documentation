import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategories } from "../data/releaseNoteCategories.js"

import {
MenuButton
} from "@pantheon-systems/pds-toolkit-react"



const categoryLinks = [];
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

        {

          // Loop through the categories and create a list of links to each category.
          Object.keys(releaseNoteCategories).map((categorySlug, index) => (

              <Link
                to={`/release-notes/${categorySlug}`}

                style={{ 'color': releaseNoteCategories[categorySlug].color }}
              >
                {releaseNoteCategories[categorySlug].displayName}
              </Link>

          ))
        }



      </div>




    </div>







  )
}

export default ReleaseNoteCategorySelector
