import React from "react"
import { Link } from "gatsby"

import { FlexContainer, Icon } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const NavButtons = ({
  prev,
  next,
  prevTitle = "Previous",
  nextTitle = "Continue",
}) => {
  return (
    <FlexContainer
      justifyContent="between"
      className="pds-spacing-mar-block-start-m pds-spacing-mar-block-end-xl"
    >
      <ul className="pagination pager-guides">
        {prev && (
          <li className="pagination__prev">
            <Link to={prev} rel="prev" className="pds-button">
              <Icon iconName="angleLeft"></Icon>
              {prevTitle}
            </Link>
          </li>
        )}
        {next && (
          <li className="pagination__next">
            <Link to={next} rel="next" className="pds-button">
              {nextTitle}
              <Icon iconName="angleRight"></Icon>
            </Link>
          </li>
        )}
      </ul>
    </FlexContainer>
  )
}

export default NavButtons
