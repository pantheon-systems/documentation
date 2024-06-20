import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { SideNavCompact } from "@pantheon-systems/pds-toolkit-react"


function turnItemIntoLink(item, activePage) {
  return {
    isActive: item.link === activePage,
    links: item.children ? item.children.map((child) => turnItemIntoLink(child, activePage)) : false,
    linkContent: <Link to={item.link}>
      {item.title}
    </Link>
  }
}

const turnItemsIntoLinks = (items, activePage) => {
  return items.map((item) => {
    return turnItemIntoLink(item, activePage);
  })
}

const SidebarNav = ({ links, title }) => {
  return (
    <SideNavCompact
      headingText={title}
      menuItems={links}
    />
  )
}



export default SidebarNav
export { SidebarNav, turnItemsIntoLinks }
