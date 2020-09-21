import React from "react"
import './style.css';

const reviewDate = ({ date, link }) => {
  var formattedDate = new Date(`${date}`)
  formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset() )
  var thisLink = link ? `| <a href=${link}>Product Page</a>` : null
  return (
    <>
      <h4 className="review-date toc-ignore" >
        Last reviewed: {formattedDate.toDateString().replace(/^\S+\s/,'')} {link ? 
          <>
          | <a href={link}>Product Page</a>
          </>
          : null}
      </h4>
    </>
  )
}

export default reviewDate
