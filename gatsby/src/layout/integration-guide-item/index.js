import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image';
import './style.css';

const propTypes = {
  
}

function IntegrationGuideItem(props) {
  const {url, image} = props;
  return (
    <div className="flex-panel-item-platform-integrations-guides">
      <a href={url}>
        <div className="flex-panel-body-platform-integrations">
          <div className="platform-integrations">
            <Image alt={image} path={image} className="main-topic-info__plugin-image" />
          </div>
        </div>
      </a>
    </div>
  )
}

IntegrationGuideItem.propTypes = propTypes

export default IntegrationGuideItem
