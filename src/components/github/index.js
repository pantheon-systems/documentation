import React from "react"
import "./style.css"

const Github = ({ pageTitle, path, editPath }) => {
  return (
    editPath ?
    <div>
      <a
        href={`https://github.com/pantheon-systems/documentation/edit/main/${editPath}`}
        target="blank"
      >
        <i className="fa fa-github" /> Edit this page on GitHub
      </a>
      &nbsp; | &nbsp;
      <a
        href={`https://github.com/pantheon-systems/documentation/issues/new?title=${pageTitle}%20Doc%20Update%20&body=Re%3A%20%5B${pageTitle}%5D(https%3A%2F%2Fpantheon.io/docs/${path})%0A%0APriority%3A%20Low%2FMedium%2FHigh%20(choose%20one%2C%20remove%20the%20other%20options)%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution`}
        target="blank"
      >
        <i className="fa fa-github" /> Report an issue with this doc
      </a>
    </div>
    : null
  )
}

export default Github
