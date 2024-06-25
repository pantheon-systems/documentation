import React from "react"

import getOmniItems from "./getOmniItems";





const getOmniSidebarActiveSection = ({activePage}) => {


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


  const OmniItems = getOmniItems();
  if (OmniItems) {

  return [findParentWithActiveLink(OmniItems, activePage)];
  }
  else {
    return undefined;

  }
}




export default getOmniSidebarActiveSection;

