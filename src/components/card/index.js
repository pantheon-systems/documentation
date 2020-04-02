import React from "react"
import logo from "../../../source/images/official-plugin.svg"
import './style.css';

const Card = ({ title, isOfficial, author, authorLink, link, children }) => {
  return (
    <div className="flex-panel-item">
      <div className="flex-panel-body">
        <div className="flex-panel-title">
          <h3 className="plugin-title">{title}</h3>
          {isOfficial && (
            <div className="pantheon-official">
              <img
                alt="Official Pantheon Plugin"
                src={logo}
                className="main-topic-info__plugin-image"
              />
              <p className="pantheon-official">Pantheon Official</p>
            </div>
          )}
        </div>
        <p className="topic-info__description">
          Author: <a href={authorLink}>{author}</a>
        </p>
        <p className="topic-info__description">{children}</p>
        <a href={link} className="btn-primary btn get-plugin">
          Get Plugin
        </a>
      </div>
    </div>
  )
}

export default Card
