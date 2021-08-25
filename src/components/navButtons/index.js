import React from "react"
import { Link } from "gatsby"
import './style.css';

const NavButtons = ({ prev, next, prevTitle = 'Previous', nextTitle = 'Continue' }) => {
  return (
    <div className="row terminus-pager col-md-12">
      <div className="col-xs-6 col-md-6">
        {prev && (
          <ul className="pull-left pagination pager-guides">
            <li>
              <Link to={prev} rel="prev">
                <span className="terminus-pager-lsaquo">‹</span> {prevTitle}
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="col-xs-6 col-md-6">
        {next && (
          <ul className="pull-right pagination pager-guides">
            <li>
              <Link to={next} rel="prev">
                <span className="terminus-pager-rsaquo">›</span> {nextTitle}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default NavButtons
