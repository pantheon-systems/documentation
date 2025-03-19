import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import { ContainerWidth } from '../customPropTypes';

// Local utilities.
import { getDescendants, initiateSlots, mergeClasses } from '../pds-utils';

import { MOBILE_MENU_BREAKPOINT } from '../../vars/responsive';

// Components.
import {
  Container,
  Icon,
  PantheonLogo,
} from '@pantheon-systems/pds-toolkit-react';

import './docs-navbar.css';

/**
 * DocsNavbar UI component
 */
export const DocsNavbar = ({
  children,
  containerWidth = 'x-wide',
  mobileMenuMaxWidth = MOBILE_MENU_BREAKPOINT,
  className,
  ...props
}) => {
  // State
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1025);

  // Add event listeners and get initial windowWidth.
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle responsiveness.
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  // Check if mobile.
  const isMobile = windowWidth <= mobileMenuMaxWidth;

  // Set up classes.
  const baseClass = 'pds-navbar';
  const mobileClass = isMobile
    ? `${baseClass}--isMobile`
    : `${baseClass}--notMobile`;

  // Handle closing mobile menu with esc key.
  const handleKeyUp = (event) => {
    var key = event.key;
    var flag = false;

    switch (key) {
      // close menu
      case 'Esc':
      case 'Escape':
        setMobileNavOpen(false);
        flag = true;
        break;

      // Do nothing.
      default:
        break;
    }

    // If something desired happened prevent default behavior.
    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  // Handle opening/closing of mobile menu via button.
  const handleClick = () => setMobileNavOpen(!mobileNavOpen);

  // Adjust focus of menu items depending on visibility of the menu.
  const parentRef = React.createRef();

  useEffect(() => {
    if (windowWidth <= mobileMenuMaxWidth) {
      // Get all child elements of the mobile menu.
      if (children) {
        const childElements = getDescendants(
          document.querySelector('.pds-navbar__mobile'),
        );

        // Element types to remove focus.
        const disableList = ['a', 'button', 'input', 'select', 'textarea'];

        // Remove focus from these types if mobile nav is closed.
        if (!mobileNavOpen) {
          // Remove focus.
          childElements.forEach((elem) => {
            if (disableList.includes(elem.nodeName.toLowerCase())) {
              elem.tabIndex = -1;
            }
          });
        } else {
          // re-add focus.
          childElements.forEach((elem) => {
            if (disableList.includes(elem.nodeName.toLowerCase())) {
              elem.tabIndex = 0;
            }
          });
        }
      }
    }
  }, [children, mobileMenuMaxWidth, mobileNavOpen, windowWidth]);

  // Close the mobile menu when clicking the a link within it or the home link.
  // The is necessary for client-side routing.
  const handleOpenMobileClick = (event) => {
    // If the target is a link, close the menu.
    if (event.target.nodeName === 'A') {
      setMobileNavOpen(false);
    }
  };

  useEffect(() => {
    if (mobileNavOpen) {
      const mobileNavbar = document.querySelector('.pds-navbar__bar-mobile');
      const mobileMenu = document.querySelector('.pds-navbar__mobile');

      mobileNavbar.addEventListener('click', handleOpenMobileClick);
      mobileMenu.addEventListener('click', handleOpenMobileClick);
      return () => {
        mobileNavbar.removeEventListener('click', handleOpenMobileClick);
        mobileMenu.removeEventListener('click', handleOpenMobileClick);
      };
    }
  }, [mobileNavOpen]);

  // Disallow horizontal scrolling when at sm and md breakpoints.
  useEffect(() => {
    if (windowWidth <= mobileMenuMaxWidth) {
      document.body.classList.add('pds-no-scroll-x');
    } else {
      document.body.classList.remove('pds-no-scroll-x');
    }
  }, [mobileMenuMaxWidth, windowWidth]);

  // Disallow all scrolling when mobile menu is open.
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.classList.add('pds-no-scroll');
    } else {
      document.body.classList.remove('pds-no-scroll');
    }
  }, [mobileNavOpen]);

  // Initiate slots.
  const slots = initiateSlots(children);

  // Assign content to named slots for this component.
  const itemsLeftContent = slots['items-left'];
  const itemsRightContent = slots['items-right'];

  const logoContent = (
    <PantheonLogo
      linkContent={
        <a href="https://pantheon.io" target="_blank" rel="noreferrer">
          Pantheon Home
        </a>
      }
    />
  );

  // Render the toggle button.
  const toggleButton = (
    <button
      className={`${baseClass}__menu-toggle`}
      aria-label={
        mobileNavOpen ? 'Close navigation area' : 'Open navigation area'
      }
      onClick={handleClick}
    >
      <Icon iconName={mobileNavOpen ? 'xmark' : 'bars'} iconSize="lg" />
    </button>
  );

  // Render the mobile menu.
  const mobileNavOpenContents = (
    <div
      className={
        mobileNavOpen
          ? `${baseClass}__mobile ${baseClass}__mobile--open`
          : `${baseClass}__mobile ${baseClass}__mobile--closed`
      }
      ref={parentRef}
    >
      <Container>
        {itemsLeftContent}
        {itemsRightContent}
      </Container>
    </div>
  );

  // Render the mobile markup.
  const mobileMarkup = (
    <FocusTrap
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        initialFocus: false,
      }}
    >
      <div>
        <Container className={`${baseClass}__bar-mobile`}>
          <div className={`${baseClass}__inner-mobile`}>
            {logoContent}
            {children && toggleButton}
          </div>
        </Container>
        <Container>{children && mobileNavOpenContents}</Container>
      </div>
    </FocusTrap>
  );

  // Render the wide markup.
  const wideMarkup = (
    <Container width={containerWidth} className={`${baseClass}__inner`}>
      <div className={`${baseClass}__logo`}>{logoContent}</div>
      <div className={`${baseClass}__content`}>
        {itemsLeftContent ? (
          <div className={`${baseClass}__items-left`}>{itemsLeftContent}</div>
        ) : (
          <span></span>
        )}
        {itemsRightContent && (
          <div className={`${baseClass}__items-right`}>{itemsRightContent}</div>
        )}
      </div>
    </Container>
  );

  // Render the output.
  return (
    <header
      className={mergeClasses([baseClass, mobileClass, className])}
      {...props}
    >
      {isMobile ? mobileMarkup : wideMarkup}
    </header>
  );
};

// Prop types.
DocsNavbar.propTypes = {
  /**
   * Navbar content.
   */
  children: PropTypes.node,
  /**
   * PDS container width.
   */
  containerWidth: ContainerWidth,
  /**
   *  Mobile menu will be enabled when viewport is at or below this number in pixels.
   */
  mobileMenuMaxWidth: PropTypes.number,
  /**
   * Additional class names.
   */
  className: PropTypes.string,
};
