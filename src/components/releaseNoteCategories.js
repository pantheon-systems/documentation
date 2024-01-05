import React from "react"
import { Link } from "gatsby"
import { theFunction, oldReleaseNoteCategories, otherStuff } from "../data/releaseNoteCategories.js"





const ReleaseNoteCategories = ({categories}) => {


if (!categories) {
  return null
}
  const zoldReleaseNoteCategories = theFunction();

  console.log(zoldReleaseNoteCategories);
console.log(oldReleaseNoteCategories);

  return (
    <div>
{/* If there is one category display the singular form. */
  categories.length === 1
    ? <h3>Category:</h3>
    : <h3>Categories:</h3>
}


      {categories.map((categorySlug, index) => (

// If the category is in the oldReleaseNoteCategories object
// return the displayName from the zoldReleaseNoteCategories object
// else return the categorySlug




        <div key={index}>

          <Link
            to={`/release-notes/${categorySlug}`}
          >
            <h4 style={{ 'color': zoldReleaseNoteCategories[categorySlug].color }}>{zoldReleaseNoteCategories[categorySlug].displayName}</h4>
          </Link>



        </div>


      ))
      }
    </div>

  )
}

export default ReleaseNoteCategories
