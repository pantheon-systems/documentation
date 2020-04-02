import React from "react"
import './style.css';


const reviewDate = ({ date }) => {
  var formattedDate = new Date(`${date} 01:00:00 GMT-05:00`)
  return (
    <>
      <h4 className="review-date toc-ignore" >
        Last reviewed: {formattedDate.toDateString().replace(/^\S+\s/,'')}
      </h4>
    </>
  )
}

export default reviewDate
