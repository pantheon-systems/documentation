import React from "react"



const FormattedPublishedDate = ({ dateString }) => {

  // Todo, more type checking.
  if (!dateString) {
    return null
  }

  // Turn ReleaseNoteData.frontmatter.published_date into a date object.
  // And then format it as Month Day, Year.
  // https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString(undefined, options);


  return (
    <div>

      {formattedDate}


    </div>

  )
}

export default FormattedPublishedDate
