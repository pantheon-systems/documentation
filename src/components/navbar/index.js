import React from "react"
import NavbarItem from "../navbarItem"

import { ExpansionPanel } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Navbar = ({ title, items, activePage }) => {
  const menu = (
    <ul id="manual-guide-toc" className="manual-guide-toc__menu">
      {items.map((item) => {
        return (
          <NavbarItem
            key={`${item.id}-item-key`}
            item={item}
            activePage={activePage}
          />
        )
      })}
    </ul>
  )

  return (
    <>
      {/* Mobile nav */}
      <nav
        className="manual-guide-toc guide-nav--mobile"
        aria-labelledby="guide-nav"
      >
        <ExpansionPanel
          summary={title}
          className="guide-nav__expansion-panel"
        >
          {menu}
        </ExpansionPanel>
      </nav>

      {/* Desktop/default nav */}
      <nav
        className="manual-guide-toc guide-nav--default"
        aria-labelledby="guide-nav"
      >
        <h2 id="guide-nav" className="manual-guide-toc__heading">
          {title}
        </h2>

        {items && menu}
      </nav>
    </>
  )
}

export default Navbar
