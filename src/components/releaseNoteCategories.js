import React from "react"

const ReleaseNoteCategories = ({categories}) => {

console.log(categories);

if (!categories) {
  return null
}

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <h2>{category}</h2>
        </div>
      ))
      }
    </div>

  )
}

export default ReleaseNoteCategories
