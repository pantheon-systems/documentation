import React, { Component } from "react"

class Tab extends Component {
  render() {
    let id = this.props.title
      .trim()
      .replace(" ", "-")
      .toLowerCase()
    let className = this.props.active ? "active" : ""

    return (
      <div role="tabpanel" className={`tab-pane ${className}`} id={this.props.id}>
        {this.props.children}
      </div>
    )
  }
}

export default Tab
