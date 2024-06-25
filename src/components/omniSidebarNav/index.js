import React from "react"
import { SidebarNav, turnItemsIntoLinks } from "../sidebarNav"
import CertificationItems from "./submenus/certification";
import getGuideDirectory from "./getGuideDirectory";


const OmniSidebarNav = ({activePage, maximumParent}) => {

  const OmniItems = [
    {
      link: "/",
      title: "Pantheon Docs",
      children: [

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
    },
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
