import React from "react"

import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import CertificationItems from "./submenus/certification";


const OmniSidebarNav = ({activePage, maximumParent}) => {

  const OmniItems = [
    {
      link: "/get-started",
      title: "Get Started",
    },
    {
      link: "/certification",
      title: "WebOps Certification",
      children: CertificationItems
    }
  ];

  function findSubMenuItemsToUse(maximumParent, NestedItems) {
    for (let item of NestedItems) {
      if (item.link === maximumParent) {
        return item;
      } else if (item.subItems && item.subItems.length > 0) {
        const found = findSubMenuItemsToUse(maximumParent, item.subItems);
        if (found) return found;
      }
    }
    return undefined;
  }

  const activeParent = [findSubMenuItemsToUse(maximumParent, OmniItems)];

  const OmniLinks = turnItemsIntoLinks(activeParent, activePage);

  return (
    <SidebarNav
      slot="guide-menu"
      title={OmniLinks[0].linkContent}
      links={OmniLinks[0].links} />
  )
}


export default OmniSidebarNav;


