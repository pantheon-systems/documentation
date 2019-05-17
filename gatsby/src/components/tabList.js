import React from "react"
import Tab from "./tab"
class TabList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { activeTab: "" }
  }

  selectTab = selectedTab => {
    this.setState({
      ...this.state,
      activeTab: selectedTab,
    })
  }

  render() {
    let activeTab = ""
    return (
      <>
        <ul className="nav nav-tabs" role="tablist">
          {this.props.children.map((tab, i, arr) => {
            let id = tab.props.id
              .trim()
              .replace(" ", "-")
              .toLowerCase()
            let className = ""

            if (id === this.state.activeTab || (tab.props.active & this.state.activeTab === "")) {
              className = "active"
              activeTab = id
            }

            return (
              <li key={i} id={`${id}-id`} role="presentation" className={className}>
                <a
                  href={`#${id}`}
                  aria-controls={id}
                  role="tab"
                  data-toggle="tab"
                  onClick={() => this.selectTab(id)}
                >
                  {tab.props.title}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="tab-content">
          {this.props.children.map((tab, i, arr) => {
            let id = tab.props.id
              .trim()
              .replace(" ", "-")
              .toLowerCase()

            return (
              <Tab key={i} title={tab.props.title} active={id === activeTab}>
                {tab.props.children}
              </Tab>
            )
          })}
        </div>
      </>
    )
  }
}

export default TabList
