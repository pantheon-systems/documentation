import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategoryLoader } from "../data/releaseNoteCategories.js"
import { Tag } from "@pantheon-systems/pds-toolkit-react"


const ReleaseNoteCategories = ({categories}) => {

if (!categories) {
  return null
}

  return (
    <div>
{/*
@todo: Should this text be present but hidden for screen readers?

If there is one category display the singular form.
  categories.length === 1
    ? <h3>Category:</h3>
    : <h3>Categories:</h3>
    */
}

      {categories.map((categorySlug, index) => (
        <div key={index}>

        {/* @TODO the Tags should be links.
          <Link to={`/release-notes/${categorySlug}`} >
            <h4 style={{ 'color': releaseNoteCategoryLoader(categorySlug).color }}>{releaseNoteCategoryLoader(categorySlug).displayName}</h4>
          </Link> */}

         {/* Todo, figure out how to make the colors meaningful. */}

          <Tag tagText={releaseNoteCategoryLoader(categorySlug).displayName} color={releaseNoteCategoryLoader(categorySlug).displayName}  />
        </div>
      ))
      }
    </div>

  )
}

export default ReleaseNoteCategories
