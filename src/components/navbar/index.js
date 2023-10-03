import React from "react"
import NavbarItem from "../navbarItem"
import "./style.css"

const Navbar = ({ title, items, activePage }) => {
  return (
    <nav className="manual-guide-toc" aria-labelledby="guide-nav">
      <button
        type="button"
        className="navbar-toggle"
        data-toggle="collapse"
        data-target="#guide-collapse"
        data-original-title=""
        title=""
      >
        <span className="sr-only">Toggle navigation</span>
        <i className="fa fa-bars" />
      </button>
      <h2 id="guide-nav" className="manual-guide-toc__heading">
        {title}
      </h2>
      <div className="collapse navbar-collapse" id="guide-collapse">
        {items && (
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
        )}
      </div>
    </nav>
  )
}

export default Navbar
