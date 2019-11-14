import React from "react"
import './style.css';

const Enablement = ({ title, link, campaign, children }) => {
  _handleClick() {
    window.analytics.track("Docs Enablement Clicked", {
        campaign: {campaign},
    });
}
  return (
    <div className="enablement">
      <h4 className="info">
        <a href={link} class="external" onClick={this._handleClick}>{title}</a>
      </h4>
      {children}
    </div>
  )
}

export default Enablement
