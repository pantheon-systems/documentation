import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import getOmniItems from "./getOmniItems";
import getOmniSidebarActiveSection from "./getOmniSidebarActiveSection.js";






function findSubMenuItemsToUse(maximumParent, NestedItems) {
  for (let item of NestedItems) {
    if (item.link === maximumParent) {
      return item;
    }
  }
  return undefined;
}

function findParentWithActiveLink(NestedItems, activePage) {
  // This function will return the top-level array of items that contains the active page
  // no matter how deeply nested it is.
  for (let item of NestedItems) {
    if (containsActiveLink(item, activePage)) {
      return item;
    }
  }
}

function containsActiveLink(item, activePage) {
  if (item.link === activePage) {
    return true;
  } else if (item.children && item.children.length > 0) {
    for (let child of item.children) {
      if (containsActiveLink(child, activePage)) {
        return true;
      }
    }
  }
  return false;
}




const OmniSidebarNav = ({activePage, maximumParent}) => {

  const OmniItems = getOmniItems();




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



 // const activeParent = [findSubMenuItemsToUse(maximumParent, OmniItems)];
//  const activeParent = [findParentWithActiveLink(OmniItems, activePage)];

    const activeParent = getOmniSidebarActiveSection({OmniItems, activePage});

  const OmniLinks = turnItemsIntoLinks(activeParent, activePage);

  return (
    <SidebarNav
      slot="guide-menu"
      title={OmniLinks[0].linkContent}
      links={OmniLinks[0].links} />
  )
}

export default OmniSidebarNav;

