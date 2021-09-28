import React from "react"
import './style.css';

const Enablement = ({ title, link, campaign, children }) => {

  function _handleClick() {
    if (window.analytics){
      window.analytics.track("Docs Enablement Clicked", {
          campaign: {campaign},
      });
    }
  }
  return (
    <div className="enablement">
      <h4 className="info">
        <a href={link} className="external" onClick={_handleClick}>{title}</a>
      </h4>
      {children}
    </div>
  )
}

export default Enablement
