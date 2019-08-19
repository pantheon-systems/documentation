import React from "react"

const Slack = () => {
  return (
    <iframe
      title="Slack"
      src="https://slackin.pantheon.io/iframe"
      className="__slackin"
      style={{
        borderWidth: 0,
        width: "200px",
        height: "20px",
        visibility: "visible",
        marginLeft: 3,
      }}
    />
  )
}

export default Slack
