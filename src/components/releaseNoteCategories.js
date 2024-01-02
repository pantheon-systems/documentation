import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategories } from "../data/releaseNoteCategories.js"



const ReleaseNoteCategories = ({categories}) => {

if (!categories) {
  return null
}

  return (
    <div>
{/* If there is one category display the singular form. */
  categories.length === 1
    ? <h3>Category:</h3>
    : <h3>Categories:</h3>
}


      {categories.map((categorySlug, index) => (


        <div key={index}>

          <Link
            to={`/release-notes/${categorySlug}`}
          >
            <h4 style={{ 'color': releaseNoteCategories[categorySlug].color }}>{releaseNoteCategories[categorySlug].displayName}</h4>
          </Link>



        </div>
      ))
      }
    </div>

  )
}

export default ReleaseNoteCategories
