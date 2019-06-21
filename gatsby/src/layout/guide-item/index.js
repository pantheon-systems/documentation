import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image';

const propTypes = {
  
}

function GuideItem(props) {
  const {url, text, image} = props;
  return (
    <div className="flex-panel-item-guides-landing">
      <div className="flex-panel-body-pantheon-workflows">
        <a href={url}>
        <div className="pantheon-workflows">
          <Image alt={text} path={image} style={{maxHeight:'200px'}} className="main-topic-info__plugin-image" />
          <h3>{text}</h3>
        </div>
        </a>
      </div>
    </div>
  )
}

GuideItem.propTypes = propTypes

export default GuideItem
