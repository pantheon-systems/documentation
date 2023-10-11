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
      {prev && (
        <ul className="pagination pager-guides">
          <li>
            <Link to={prev} rel="prev" className="pds-button">
              <Icon iconName="angleLeft"></Icon>
              {prevTitle}
            </Link>
          </li>
        </ul>
      )}
      {next && (
        <ul className="pagination pager-guides">
          <li>
            <Link to={next} rel="prev" className="pds-button">
              {nextTitle}
              <Icon iconName="angleRight"></Icon>
            </Link>
          </li>
        </ul>
      )}
    </FlexContainer>
  )
}

export default NavButtons
