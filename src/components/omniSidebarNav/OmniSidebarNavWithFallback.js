import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import getOmniSidebarActiveSection from "./getOmniSidebarActiveSection.js";
import Navbar from "../navbar"

const OmniSidebarNavWithFallback = ({activePage, fallbackItems, fallbackTitle}) => {

    const menuItems = getOmniSidebarActiveSection({activePage});

  // @todo, checking the 0 property is a hack, need to fix this.
  if (menuItems[0]) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    console.log("OmniLinks", OmniLinks);
    return (
      <SidebarNav

        title={OmniLinks[0].linkContent}
        links={OmniLinks[0].links} />
    )
  }
  else {
    return (
      <Navbar
        title={fallbackTitle}
        activePage={activePage}
        items={fallbackItems}
      />
    )
  }
}

export default OmniSidebarNavWithFallback;
