import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategoryLoader } from "../../data/releaseNoteCategories.js"
import { Tag } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const ReleaseNoteCategories = ({ categories, className }) => {
  if (!categories) {
    return null
  }

  return (
    <div className={className}>
      {
        /* If there is one category display the singular form.*/
        categories.length === 1 ? (
          <h3 className="visually-hidden">Category:</h3>
        ) : (
          <h3 className="visually-hidden">Categories:</h3>
        )
      }

      <div className="docs-release-notes-tags">
        {categories.map((categorySlug, index) => (
          <Tag
            key={index}
            linkContent={<Link to={`/release-notes/${categorySlug}`} />}
            tagLabel={releaseNoteCategoryLoader(categorySlug).displayName}
            tagColor={releaseNoteCategoryLoader(categorySlug).color}
          />
        ))}
      </div>
    </div>
  )
}

export default ReleaseNoteCategories
