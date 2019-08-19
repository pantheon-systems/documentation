import React, { useState, useEffect } from "react"
import Tab from "../tab"
import './style.css';

const TabList = ({ children }) => {
  const [activeTab, setActiveTab] = useState(null)
  const [initialized, setInitialized] = useState(null)

  useEffect(() => {
    if (!initialized) {
      // determine which tab is initially active
      const initialActiveTab = children.find(tab => tab.props.active === true)
      initialActiveTab && setActiveTab(initialActiveTab.props.id)

      setInitialized(true)
    }
  })

  const renderTab = tab => {
    let elementId = tab.props.id
      .trim()
      .replace(" ", "-")
      .toLowerCase()

    let elementClass =
      elementId === activeTab || tab.props.active & (activeTab === "")
        ? "active"
        : ""

    return (
      <li
        key={`tab-${elementId}`}
        id={`${elementId}-id`}
        role="presentation"
        className={elementClass}
      >
        <a
          href={`#${elementId}`}
          aria-controls={elementId}
          role="tab"
          data-toggle="tab"
          onClick={() => setActiveTab(elementId)}
        >
          {tab.props.title}
        </a>
      </li>
    )
  }

  const renderTabContent = tab => {
    let elementId = tab.props.id
      .trim()
      .replace(" ", "-")
      .toLowerCase()

    return (
      <Tab
        key={`tab-content-${elementId}`}
        title={tab.props.title}
        active={elementId === activeTab}
      >
        {tab.props.children}
      </Tab>
    )
  }

  return (
    <>
      <ul className="nav nav-tabs" role="tablist">
        {children.map(tab => renderTab(tab))}
      </ul>
      <div className="tab-content">
        {children.map(tab => renderTabContent(tab))}
      </div>
    </>
  )
}

export default TabList
