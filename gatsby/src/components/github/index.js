import React from "react"
import './style.css';

const Github = ({ pageTitle, path, editPath }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-contribute dropdown-toggle"
        type="button"
        id="dropdownMenu1"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <i className="fa fa-github" /> Contribute
        <span className="caret" />
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li>
          <a
            href={`https://github.com/pantheon-systems/documentation/edit/master/${editPath}`}
            target="blank"
          >
            Edit This Page
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/pantheon-systems/documentation/issues/new?title=${pageTitle}%20Doc%20Update%20&body=Re%3A%20%5B${pageTitle}%5D(https%3A%2F%2Fpantheon.io/docs/${path})%0A%0APriority%3A%20Low%2FMedium%2FHigh%20(choose%20one%2C%20remove%20the%20other%20options)%0A%0A%23%23%20Issue%20Description%3A%0A%0A%23%23%20Suggested%20Resolution`}
            target="blank"
          >
            Report Doc Issue
          </a>
        </li>
        <li>
          <a
            href={`https://github.com/pantheon-systems/documentation/issues/new?title=New%20Doc%20Proposal%20&body=Priority%3A%20Low%2FMedium%2FHigh%20(choose%20one%2C%20remove%20the%20other%20options)%0A%0A%23%23%20Title%0A%0A%0A%23%23%20Description%0A%0A%0A%23%23%20Outline%0A%0A%0A%23%23%20Expected%20Audience%0A%0A%0A%23%23%20Path%0A(e.g.%20%60source%2Fdocs%2Farticles%2Fsites%2Fcode%60%20or%20%60source%2Fdocs%2Farticles%2Fwordpress%60)&labels=new%20doc`}
            target="blank"
          >
            Suggest New Page
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Github
