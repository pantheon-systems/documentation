import React from "react"
import logo from "../../../source/images/official-plugin.svg"

import { Icon, PantheonLogo } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Card = ({ title, isOfficial, author, authorLink, link, children }) => {
  return (
    <div className="plugin-card pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4">
      <div className="plugin-card__header">
        {isOfficial && <PantheonLogo displayType="icon" />}

        <div className="plugin-card__title-wrapper">
          <h2 className="plugin-card__title">{title}</h2>
          {isOfficial && (
            <div className="plugin-card__pantheon-official">
              Pantheon Official
            </div>
          )}
        </div>
      </div>

      <div className="plugin-card__text">
        <p className="plugin-card__author">
          Author: <a href={authorLink}>{author}</a>
        </p>
        <p className="plugin-card__description">{children}</p>
      </div>

      <div className="plugin-card__link">
        <a
          href={link}
          target="_blank"
          className="pds-button pds-button--secondary"
        >
          Get plugin
          <Icon
            iconName="externalLink"
            iconSize="md"
            className="pds-spacing-pad-inline-start-5xs"
          />
        </a>
      </div>
    </div>
  )
}

export default Card
