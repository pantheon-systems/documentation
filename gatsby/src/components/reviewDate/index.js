import React from "react"
import './style.css';


const reviewDate = ({ date }) => {
  var formattedDate = new Date(date)
  return (
    <>
      <h3 className="review-date toc-ignore" >
        Last reviewed: {formattedDate.toDateString().replace(/^\S+\s/,'')}
      </h3>
    </>
  )
}

export default reviewDate
