import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Tile } from "@pantheon-systems/pds-toolkit-react"

const propTypes = {
  topics: PropTypes.array,
}

// This component translates the yaml data into something useful for PDS implementation of tiles.

function TopicsGrid(props) {
  const { topics } = props

  return (
    <div className="pds-tile-grid">
      {topics &&
        topics.map((topic, index) => (
          <Tile
            key={index}
            imageSrc={topic.imageSrc}
            headingLevel="h3"
            headingText={topic.headingText}
            summary={topic.summary}
            linkContent={
              <Link to={topic.url}>
                Learn more
                <span className="visually-hidden">
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
