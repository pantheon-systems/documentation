import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import CertificationItems from "./submenus/certification";
import getGuideDirectory from "./getGuideDirectory";


const OmniSidebarNav = ({activePage, maximumParent}) => {

  const OmniItems = [

    {
      link: "/get-started",
      title: "Get Started",
    },
    {
      link: "/decoupled",
      title: "Front-End Sites",
      children: [
        getGuideDirectory("guides/decoupled/wp-nextjs-frontend-starters"),
        getGuideDirectory("guides/decoupled/wp-backend-starters"),
      ]
    },
    {
      link: "/certification",
      title: "WebOps Certification",
      children: CertificationItems
    },
        {
      link: "/get-started",
      title: "about",
    },
      ]

  ;

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


 // const activeParent = [findSubMenuItemsToUse(maximumParent, OmniItems)];
  const activeParent = [findParentWithActiveLink(OmniItems, activePage)];

  const OmniLinks = turnItemsIntoLinks(activeParent, activePage);

  return (
    <SidebarNav
      slot="guide-menu"
      title={OmniLinks[0].linkContent}
      links={OmniLinks[0].links} />
  )
}

export default OmniSidebarNav;
