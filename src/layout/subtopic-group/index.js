import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Panel } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  topics: PropTypes.array,
}

function SubtopicGroup(props) {
  const { title, subTitle, topics } = props
  return (
    <Panel className="subtopic__container">
      <h2 className="subtopic__heading">{title}</h2>
      {subTitle && (
        <p className="pds-lead-text pds-lead-text--small">{subTitle}</p>
      )}
      <hr />
      {topics &&
        topics.map((topic) => (
          <div key={topic.title} className="subtopic__list-group">
            {topic.title && <h3>{topic.title}</h3>}
            <ul className="subtopic__list">
              {topic.links &&
                topic.links.map((link) => (
                  <li key={link.url}>
                    <Link to={link.url}>
                      {link.icon && <i className={link.icon} />} {link.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </Panel>
  )
}

SubtopicGroup.propTypes = propTypes

export default SubtopicGroup
