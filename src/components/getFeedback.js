import React from "react"

const GetFeedBack = ({ formId, page, topic }) => {
  return (
    <iframe
      title="GetFeedBack"
      style={{ width: "100%", minHeight: "320px" }}
      frameBorder="0"
      src={`https://www.getfeedback.com/r/${formId}?page=${page}&topic=${topic}`}
    />
  )
}

export default GetFeedBack
