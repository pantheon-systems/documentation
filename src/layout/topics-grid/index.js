import React from "react"
import PropTypes from "prop-types"
import TopicItem from "../topic-item"
const propTypes = {
  topics: PropTypes.array,
}

function TopicsGrid(props) {
  const { topics } = props
  return (
    <div className="topics-grid flex-panel-group">
      {topics &&
        topics.map(topic => <TopicItem topic={topic} key={topic.title} />)}
    </div>
  )
}

TopicsGrid.propTypes = propTypes

export default TopicsGrid
