import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Container, Icon, Panel } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  topics: PropTypes.array,
}

function SubtopicGroup(props) {
  const { title, subTitle, topics } = props
  return (
    <Container>
      <Panel>
        <h2 className="subtopic__heading">{title}</h2>
        {subTitle && (
          <p className="pds-lead-text pds-lead-text--sm">{subTitle}</p>
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
                        {link.icon && (
                          <Icon
                            iconName={link.icon}
                            iconSize="lg"
                            className="subtopic__icon"
                          />
                        )}
                        {link.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </Panel>
    </Container>
  )
}

SubtopicGroup.propTypes = propTypes

export default SubtopicGroup
