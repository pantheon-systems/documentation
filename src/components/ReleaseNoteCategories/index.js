import React from "react"
import { Link } from "gatsby"
import { releaseNoteCategoryLoader } from "../../data/releaseNoteCategories.js"
import { Tag } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const ReleaseNoteCategories = ({ categories, displayType, className }) => {
  if (!categories) {
    return null
  }

  /* If there is one category display the singular form.*/
  const categoryHeading = categories.length === 1 ? "Category:" : "Categories:"

  /* Change heading level based on displayType prop */
  const HeadingLevel = displayType === "page" ? "h2" : "h3"

  return (
    <div className={className}>
      <HeadingLevel className="visually-hidden">{categoryHeading}</HeadingLevel>
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
