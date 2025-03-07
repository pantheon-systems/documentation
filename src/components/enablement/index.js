import React from 'react';
import { Callout } from '@pantheon-systems/pds-toolkit-react';
import './style.css';

const Enablement = ({ title, link, campaign, children }) => {
  function _handleClick() {
    if (window.analytics) {
      window.analytics.track('Docs Enablement Clicked', {
        campaign: { campaign },
      });
    }
  }
  return (
    <Callout children={children} type="info" className="docs-alert">
      <h4>{title}</h4>
      {children}{' '}
      <a href={link} onClick={_handleClick}>
        Learn more
      </a>
    </Callout>
  );
};

export default Enablement;
