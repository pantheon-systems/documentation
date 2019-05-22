import React from "react"
import { Link } from "gatsby"

const NavButtons = ({ prev, next }) => {
  return (
    <div className="row terminus-pager col-md-12">
      <div className="col-xs-6 col-md-6">
        {prev && (
          <ul className="pull-left pagination pager-guides">
            <li>
              <Link to={"/docs/" + prev} rel="prev">
                <span className="terminus-pager-lsaquo">‹</span> Previous
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="col-xs-6 col-md-6">
        {next && (
          <ul className="pull-right pagination pager-guides">
            <li>
              <Link to={"/docs/" + next} rel="prev">
                <span className="terminus-pager-rsaquo">›</span> Continue
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default NavButtons
