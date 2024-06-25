import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import getOmniSidebarActiveSection from "./getOmniSidebarActiveSection.js";


function findSubMenuItemsToUse(maximumParent, NestedItems) {
  for (let item of NestedItems) {
    if (item.link === maximumParent) {
      return item;
    }
  }
  return undefined;
}



const OmniSidebarNav = ({activePage, maximumParent}) => {




  // const activeParent = [];
  // if (!maximumParent) {
  //   // merge all the top-level items into one array
  //   const sub = [findSubMenuItemsToUse(maximumParent, OmniItems)]

  //   // merge sub into activeParent
  //   activeParent.push(sub);


  // } else {


  //   const activer = [findParentWithActiveLink(OmniItems, activePage)];
  //   const activeParent.push(activer);
  // }


    const menuItems = getOmniSidebarActiveSection({activePage});

  const OmniLinks = turnItemsIntoLinks(menuItems, activePage);

  return (
    <SidebarNav
      slot="guide-menu"
      title={OmniLinks[0].linkContent}
      links={OmniLinks[0].links} />
  )
}

export default OmniSidebarNav;

