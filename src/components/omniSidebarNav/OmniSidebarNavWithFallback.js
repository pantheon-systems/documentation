import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import getOmniSidebarActiveSection from "./getOmniSidebarActiveSection.js";




const OmniSidebarNavWithFallback = ({activePage, fallbackItems}) => {



    const menuItems = getOmniSidebarActiveSection({activePage});



console.log("menuItems", menuItems);


  if (menuItems[0]) {
    const OmniLinks = turnItemsIntoLinks(menuItems, activePage);
    console.log("OmniLinks", OmniLinks);
    return (
      <SidebarNav
        slot="guide-menu"
        title={OmniLinks[0].linkContent}
        links={OmniLinks[0].links} />
    )
  }
  else {

    return (
      <div
        slot="guide-menu">
          this is the fallback div
        </div>

    )

  }

}

export default OmniSidebarNavWithFallback;

