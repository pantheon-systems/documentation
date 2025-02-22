import React, {
  createRef,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import FocusTrap from 'focus-trap-react';

// Local utilities.
import { getDescendants, initiateSlots, mergeClasses } from '../pds-utils';

// Contexts.
import { ResponsiveContext } from '@pantheon-systems/pds-toolkit-react';

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
  translationStrings = {
    closeMobileNav: 'Close navigation area',
    openMobileNav: 'Open navigation area',
  },
  className,
  ...props
}) => {
  // State
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Set isMobile fallback.
  let isMobile = false;

  // Get responsive context.
  const responsiveContext = useContext(ResponsiveContext);
  if (responsiveContext) {
    isMobile = responsiveContext.isMobile;
  }

  // Set up classes.
  const baseClass = 'pds-navbar';
  const mobileClass = isMobile
    ? `${baseClass}--isMobile`
    : `${baseClass}--notMobile`;

  const handleKeyUp = (e) => {
    const key = e.key;
    let flag = false;

    switch (key) {
      case 'Esc':
      case 'Escape':
        setMobileNavOpen(false);
        flag = true;
        break;

      default:
        break;
    }

    // If something desired happened prevent default behavior.
    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Add keyup event listener.
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle opening/closing of mobile menu via button.
  const handleClick = () => setMobileNavOpen(!mobileNavOpen);

  // Adjust focus of menu items depending on visibility of the menu.
  const parentRef = createRef();

  useEffect(() => {
    if (isMobile) {
      // Get all child elements of the mobile menu.
      if (children) {
        const childElements = getDescendants(
          document.querySelector('.pds-navbar__mobile'),
        );

        // Element types to remove focus.
        const disableList = ['a', 'button', 'input', 'select', 'textarea'];

        // Remove focus from these types if mobile nav is closed.
        if (childElements) {
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
    }
  }, [mobileNavOpen, children, isMobile]);

  // Close the mobile menu when clicking the a link within it or the home link.
  // The is necessary for client-side routing.
  const handleOpenMobileClick = (e) => {
    // If the target is a link, close the menu.
    if (e.target.nodeName === 'A') {
      setMobileNavOpen(false);
    }
  };

  // Add event listeners for mobile menu.
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

  // Logo configuration.
  const logoMarkup = (
    <PantheonLogo
      colorType="default"
      displayType="full"
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
        mobileNavOpen
          ? translationStrings.closeMobileNav
          : translationStrings.openMobileNav
      }
      onClick={handleClick}
    >
      <Icon iconName={mobileNavOpen ? 'xmark' : 'bars'} iconSize="lg" />
    </button>
  );

  // Sort children based on mobile_order prop for mobile view.
  const sortedChildren = React.Children.toArray(children).sort((a, b) => {
    const aOrder = isValidElement(a)
      ? parseInt(a.props['data-mobile-order'], 10) || Infinity
      : Infinity;
    const bOrder = isValidElement(b)
      ? parseInt(b.props['data-mobile-order'], 10) || Infinity
      : Infinity;
    return aOrder - bOrder;
  });

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
      <Container>{sortedChildren}</Container>
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
            {logoMarkup}
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
      <div className={`${baseClass}__logo`}>{logoMarkup}</div>

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
      className={mergeClasses([baseClass, mobileClass, className ?? ''])}
      {...props}
    >
      {isMobile ? mobileMarkup : wideMarkup}
    </header>
  );
};
