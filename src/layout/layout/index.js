import React, { Components } from 'react';
import './style.css';
import Header from '../header';
import { ButtonLink } from '@pantheon-systems/pds-toolkit-react';
import { Container, CTASlice } from '@pantheon-systems/pds-toolkit-react';
import Footer from '../footer';
import SearchBar from '../SearchBar';

// Content for CTA
const primaryCTA = (
  <ButtonLink
    variant="primary"
    size="lg"
    linkContent={
      <a
        href="https://pantheon.io/learn-pantheon?docs"
        className="pds-button pds-button--lg"
        target="_blank"
      >
        Learn Pantheon
      </a>
    }
  />
);

const secondaryCTA = (
  <ButtonLink
    variant="secondary"
    size="lg"
    linkContent={
      <a
        href="https://pantheon.io/developers/office-hours?docs"
        className="pds-button pds-button--lg pds-button--secondary"
        target="_blank"
      >
        Office Hours
      </a>
    }
  />
);

const Layout = ({
  children,
  containerWidth,
  excludeSearch,
  hasCta,
  footerBorder,
  pageType = 'default',
}) => {
  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      {!excludeSearch && (
        <Container width={containerWidth}>
          <SearchBar page={pageType} />
        </Container>
      )}
      {children}
      {hasCta && (
        <CTASlice
          backgroundColor="secondary"
          headingText="Got questions? We've got answers!"
          primaryLinkContent={primaryCTA}
          secondaryLinkContent={secondaryCTA}
          className="pre-footer-slice"
        />
      )}
      <Footer className={footerBorder ? 'with-border' : null} />
    </div>
  );
};

export default Layout;
