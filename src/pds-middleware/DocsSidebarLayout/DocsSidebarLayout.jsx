import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * DocsSidebarLayout UI component
 */
export const DocsSidebarLayout = ({
  children,
  gridGap = 'standard',
  sidebarLocation = 'right',
  sidebarMobileLocation = 'after',
  sidebarWidth = 'standard',
  className,
  ...props
}) => {
  // State
  const [windowWidth, setWindowWidth] = useState(1025);

  // Add event listeners and get initial windowWidth.
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set up classes.
  const baseClass = 'pds-sidebar-layout';
  const gridGapClass =
    gridGap === 'standard' ? 'pds-grid' : `pds-grid pds-grid--${gridGap}`;
  const locationClass = `${baseClass}--${sidebarLocation}`;

  // Handle responsiveness.
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Establish slots.
  const slots = {};
  React.Children.forEach(children, (child) => {
    const slotName = child.props.slot;
    if (slotName) {
      if (slots[slotName]) {
        slots[slotName].push(child);
      } else {
        slots[slotName] = [child];
      }
    }
  });

  // Assign grid classes based on sidebarWidth prop.
  let contentWidthClasses =
    'pds-grid-item--md-8 pds-grid-item--lg-9 pds-grid-item--xl-10';
  let sidebarWidthClasses =
    'pds-grid-item--md-4 pds-grid-item--lg-3 pds-grid-item--xl-2';

  if (sidebarWidth === 'narrow') {
    contentWidthClasses = 'pds-grid-item--md-9 pds-grid-item--lg-10';
    sidebarWidthClasses = 'pds-grid-item--md-3 pds-grid-item--lg-2';
  }

  if (sidebarWidth === 'wide') {
    contentWidthClasses = 'pds-grid-item--md-7 pds-grid-item--lg-8';
    sidebarWidthClasses = 'pds-grid-item--md-5 pds-grid-item--lg-4';
  }

  // Assign content to named slots for this component.
  const pageContent = (
    <div
      key="1"
      className={`${baseClass}__content pds-grid-item pds-grid-item--sm-4 ${contentWidthClasses}`}
    >
      {slots['content']}
    </div>
  );
  const sidebarContent = (
    <div
      key="2"
      className={`${baseClass}__side pds-grid-item pds-grid-item--sm-4 ${sidebarWidthClasses}`}
    >
      {slots['sidebar']}
    </div>
  );

  // Order content based on breakpoint and sidebarLocation
  const isMobile = windowWidth < 641 ? true : false;

  let renderedContent = [];

  if (sidebarLocation === 'left' && sidebarMobileLocation === 'before') {
    renderedContent = [sidebarContent, pageContent];
  }

  if (sidebarLocation === 'left' && sidebarMobileLocation === 'after') {
    renderedContent = isMobile
      ? [pageContent, sidebarContent]
      : [sidebarContent, pageContent];
  }

  if (sidebarLocation === 'right' && sidebarMobileLocation === 'before') {
    renderedContent = isMobile
      ? [sidebarContent, pageContent]
      : [pageContent, sidebarContent];
  }

  if (sidebarLocation === 'right' && sidebarMobileLocation === 'after') {
    renderedContent = [pageContent, sidebarContent];
  }

  // Render the output
  return (
    <div
      className={[baseClass, gridGapClass, locationClass, className]
        .join(' ')
        .trim()
        .replace(/\s+/g, ' ')}
      {...props}
    >
      {renderedContent}
    </div>
  );
};

// Prop types
DocsSidebarLayout.propTypes = {
  /**
   * Layout content.
   */
  children: PropTypes.node,
  /**
   * Width of gap between items.
   */
  gridGap: PropTypes.oneOf(['narrow', 'standard', 'wide']),
  /**
   * Position of the sidebar.
   */
  sidebarLocation: PropTypes.oneOf(['left', 'right']),
  /**
   * Position of the sidebar for mobile layout.
   */
  sidebarMobileLocation: PropTypes.oneOf(['before', 'after']),
  /**
   * Relative width of the sidebar.
   */
  sidebarWidth: PropTypes.oneOf(['narrow', 'standard', 'wide']),
  /**
   * Additional class names
   */
  className: PropTypes.string,
};
