import React, { useState, useEffect } from "react"
import Tab from "../tab"
import "./style.css"

const TabList = ({ children }) => {
  var cmsProp = "" // To be set by another component, yet to be created
  //console.log("cmsProp: ", cmsProp) // For Debugging
  const [activeTab, setActiveTab] = useState(null)
  const [initialized, setInitialized] = useState(null)
  const [selectedCms, selectCms] = useState(cmsProp ? cmsProp : null)
  //console.log("selectedCms: ", selectedCms) // For Debugging
  //console.log("selectedCms.substring(0, 6): ", selectedCms.substring(0, 6)) // For Debugging

  const [isCmsTabs, setIsCmsTabs] = useState(false)

  useEffect(() => {
    if (!initialized) {
      // determine which tab is initially active
      const initialActiveTab =
        isCmsTabs && selectedCms
          ? children.find(
              tab => tab.props.title.toLowerCase() == selectedCms.toLowerCase()
            ) ||
            children.find(tab =>
              tab.props.title.includes(selectedCms.substring(0, 6))
            )
          : children.find(tab => tab.props.active === true)
      //console.log("initialActiveTab: ", initialActiveTab) // For Debugging
      initialActiveTab && setActiveTab(initialActiveTab.props.id)

      //setInitialized(true)
    }
  }, [isCmsTabs])

  useEffect(() => {
    const cmses = ["Drupal", "WordPress"]

    const titles = children.map(tab => tab.props.title)
    //console.log("titles array: ", titles) // For Debugging

    function findCommonElement(array1, array2) {
      return array1.some(item => array2.includes(item))
    }

    if (titles.length) {
      const hasIntersection = findCommonElement(cmses, titles)
      //console.log("value of hasIntersection: ", hasIntersection) // For debugging
      setIsCmsTabs(hasIntersection)
    } else {
      setIsCmsTabs(false)
    }
  }, [children])

  const renderTab = tab => {
    //console.log("tab.props.title in renterTab: ", tab.props.title) //For Debugging
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
        {isCmsTabs && selectedCms
          ? children
              .filter(tab => {
                ///console.log("tab.props.title.includes(selectedCms: )", tab.props.title.includes(selectedCms.substring(0,6))) // For debuggind
                return tab.props.title.indexOf(selectedCms.substring(0, 6)) >= 0
              })
              .map(tab => renderTab(tab))
          : children.map(tab => renderTab(tab))}
      </ul>
      <div className="tab-content">
        {children.map(tab => renderTabContent(tab))}
      </div>
    </>
  )
}

export default TabList
