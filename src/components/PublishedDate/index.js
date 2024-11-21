import React from "react"

import "./style.css"

const PublishedDate = ({ dateString, className }) => {
  // Todo, more type checking.
  if (!dateString) {
    return null
  }

  // Turn ReleaseNoteData.frontmatter.published_date into a date object.
  // And then format it as Month Day, Year.
  // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const date = new Date(`${dateString}T00:00:00Z`); // Interpret as UTC midnight
  const options = { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }; // Format as UTC
  const formattedDate = date.toLocaleDateString(undefined, options)

  return (
    <div
      className={["docs-published-date", className]
        .join(" ")
        .trim()
        .replace(/\s+/g, " ")}
    >
      {formattedDate}
    </div>
  )
}

export default PublishedDate
