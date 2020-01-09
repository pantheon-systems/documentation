import React from "react"

import './style.css'

const AnimatedArrow = ({
  direction = 'right',
  arrowSize = '50px',
  numArrows = 2,
  baseDelay = 0.75,
  color = '#000000',
  animate = true
}) => {

  const arrowSizeNum = arrowSize.replace(/[^\d]/g, '');
  
  const arrowChevronRightSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox={`0 0 24 24`}>
      <path fill={color} d="M6.028 0v6.425l5.549 5.575-5.549 5.575v6.425l11.944-12z"/>
    </svg>
  );
  
  const arrowChevronDownSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" width={arrowSize} height={arrowSize} viewBox={`0 0 24 24`}>
      <path fill={color} d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
    </svg>
  );

  let arrowSVG = null
  let arrowTransform = '';
  let widthNum = ( arrowSizeNum * numArrows );
  let heightNum = arrowSize;
  let flexDirection = 'row';
  let animationLength = (baseDelay * numArrows);

  switch(direction) {
    case 'left':
      arrowSVG = arrowChevronRightSVG;
      arrowTransform = 'rotate(180deg)';
      flexDirection = 'row-reverse';
      break;
    case 'up':
      arrowSVG = arrowChevronDownSVG;
      arrowTransform = 'rotate(180deg)';
      widthNum = arrowSizeNum;
      heightNum = (arrowSizeNum * numArrows);
      flexDirection = 'column-reverse';
      break;
    case 'down':
      arrowSVG = arrowChevronDownSVG;
      widthNum = arrowSizeNum;
      heightNum = (arrowSizeNum * numArrows);
      flexDirection = 'column';
      break;
    default:
      arrowSVG = arrowChevronRightSVG;
      break;
  }

  const width = `${widthNum}px`;
  const height = `${heightNum}px`;

  let arrowDivs = [];
  for (let i = 0; i < numArrows; i++) {
    const animationDelay = ( baseDelay * i );
    const animation = (animate) ? `${animationLength}s linear ${animationDelay}s infinite normal none running animatedArrowFadeInOut` : '';
    arrowDivs.push(
      <div className="arrow" style={{
        transform: arrowTransform,
        animation: animation
      }}>
        {arrowSVG}
      </div>
    );
  }
  
  return (
    <div className="animated-arrow" style={{
      width: width,
      height: height,
      flexDirection: flexDirection
    }}>
      {arrowDivs}
    </div>
  )
}

export default AnimatedArrow
