import React, { useState, useEffect } from "react"
import Tab from "../tab"
import './style.css';

const TabList = ({ children }) => {
  const [activeTab, setActiveTab] = useState(null)

  const handleHashChange = () => {
    const selected = children.find(tab => [`#${tab.props.id}-id`, `#${tab.props.id}-tab`].indexOf(window.location.hash) > -1 );

    if (selected) {
      setActiveTab(selected.props.id);
    }
  }
  
  useEffect(() => {
    const selected = children.find(tab => tab.props.active === true)

    if (selected) {
      setActiveTab(selected.props.id);
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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
        id={`${elementId}-tab`}
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
