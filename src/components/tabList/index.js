import React, { useState, useEffect } from "react"

import { Tabs } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const TabList = ({ children }) => {
  const [activeTab, setActiveTab] = useState(null)
  const [initialized, setInitialized] = useState(null)

  // Convert tab data to be useful for the PDS Tabs component.
  const processedTabs = []

  children.map((tab) => {
    const tabData = {
      tabLabel: tab.props.title,
      panelContent: tab.props.children,
    }

    processedTabs.push(tabData)
  })

  useEffect(() => {
    if (!initialized) {
      // determine which tab is initially active
      const initialActiveTab = children.find((tab) => tab.props.active === true)
      initialActiveTab && setActiveTab(initialActiveTab.props.id)

      setInitialized(true)
    }
  })

  return (
    <Tabs
      ariaLabel="Tabbed content"
      tabs={processedTabs}
      className="docs-tabs"
    />
  )
}

export default TabList
