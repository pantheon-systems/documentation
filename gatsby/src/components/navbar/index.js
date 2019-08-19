import React from "react"
import NavbarItem from "../navbarItem"
import './style.css';

const Navbar = ({ title, items, activePage }) => {
  return (
    <div className="col-md-3 manual-guide-toc" role="navigation">
      <button
        type="button"
        className="navbar-toggle"
        style={{ marginTop: "-15px", paddingRight: "20px" }}
        data-toggle="collapse"
        data-target="#guide-collapse"
        data-original-title=""
        title=""
      >
        <span className="sr-only">Toggle navigation</span>
        <i className="fa fa-bars" />
      </button>
      <h3>{title}</h3>
      <div className="collapse navbar-collapse" id="guide-collapse">
        {items && (
          <ul id="manual-guide-toc" className="manual-guide-toc">
            {items.map(item => {
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
    </div>
  )
}

export default Navbar
