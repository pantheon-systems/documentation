import React from "react"
import { Link } from "gatsby"
import './style.css';

const NavbarItem = ({ item, activePage }) => {
  let children = ""
  if (item.items) {
    children = (
      <li key={`${item.id}-li-child`} id={`${item.id}-li-child`}>
        <ul id="manual-guide-toc-child" className="manual-guide-toc child">
          {item.items.map(item => {
            return (
              <li key={`${item.id}-li-key`} id={`${item.id}-li`}>
                <Link
                  to={item.link}
                  className={activePage === item.link ? "active-trail" : ""}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </li>
    )
  }

  return (
    <>
      <li key={`${item.id}-li-key`} id={`${item.id}-li`}>
        <Link
          to={item.link}
          className={activePage === item.link ? "active-trail" : ""}
        >
          {item.title}
        </Link>
      </li>
      {children}
    </>
  )
}

export default NavbarItem
