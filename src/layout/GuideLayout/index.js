import React, { Components } from "react"
import "./style.css"
import Header from "../header"
import Footer from "../footer"
import { SidebarLayout } from "@pantheon-systems/pds-toolkit-react"

const GuideLayout = ({ children, pageType = "default" }) => {
  // Establish slots for children.
  const slots = {}
  React.Children.forEach(children, (child) => {
    const slotName = child.props.slot
    if (slotName) {
      if (slots[slotName]) {
        slots[slotName].push(child)
      } else {
        slots[slotName] = [child]
      }
    }
  })

  // Assign content to named slots.
  const pageSEO = slots["seo"]
  const guideMenu = slots["guide-menu"]
  const guideContent = slots["guide-content"]

  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      {pageSEO}
      <SidebarLayout
        gridGap="narrow"
        sidebarLocation="left"
        className="pds-container pds-container--x-wide"
      >
        <div slot="sidebar" className="guide-sidebar">
          {guideMenu}
        </div>
        <div slot="content">{guideContent}</div>
      </SidebarLayout>
      <Footer className="with-border" />
    </div>
  )
}

export default GuideLayout
