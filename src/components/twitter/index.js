import React from "react"
import './style.css';

const Twitter = ({ pageTitle, path }) => {
  const text = `@getpantheon doc:${pageTitle} https://pantheon.io/docs/${path}`
  return (
        <a 
        className="btn btn-twitter"
        href={`https://twitter.com/intent/tweet?text=${text}`}
      ><i className="fa fa-twitter" /> Tweet</a>
  )
}

export default Twitter
