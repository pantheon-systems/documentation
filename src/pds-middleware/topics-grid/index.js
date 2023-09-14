import React from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"

import { Tile } from "@pantheon-systems/pds-toolkit-react"
const propTypes = {
  topics: PropTypes.array,
}

function TopicsGrid(props) {
  const { topics } = props

  return (
    <div className="pds-tile-grid">
      {topics &&
        topics.map((topic, index) => (
          <Tile
            key={index}
            headingLevel="h3"
            headingText={topic.headingText}
            summary={topic.summary}
            linkContent={
              <Link to={topic.url}>
                Learn More
                <span className="pds-visually-hidden">
                  about {topic.headingText}
                </span>
              </Link>
            }
          />
        ))}
    </div>
  )
}

TopicsGrid.propTypes = propTypes

export default TopicsGrid
