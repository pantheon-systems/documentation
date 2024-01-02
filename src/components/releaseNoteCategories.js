import React from "react"
import { Link } from "gatsby"

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

      {categories.map((category, index) => (
        <div key={index}>

          <Link
            to={`/release-notes/${category}`}
          >
            <h4>{category}</h4>
          </Link>



        </div>
      ))
      }
    </div>

  )
}

export default ReleaseNoteCategories
