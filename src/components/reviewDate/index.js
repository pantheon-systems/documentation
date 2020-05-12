import React from "react"
import './style.css';

const reviewDate = ({ date }) => {
  var formattedDate = new Date(`${date} 08:00:00`)
  return (
    <>
      <h4 className="review-date toc-ignore" >
        Last reviewed: {formattedDate.toDateString().replace(/^\S+\s/,'')}
      </h4>
    </>
  )
}

export default reviewDate
