import React from 'react';
import { Link } from 'gatsby';

import { Container, PantheonLogo } from '@pantheon-systems/pds-toolkit-react';

import './style.css';

const StaticHeader = ({ page }) => (
  <header className="docs-static-header">
    <Container className="docs-static-header__container">
      <div className="docs-static-header__logo">
        <PantheonLogo
          linkContent={<a href="https://pantheon.io" target="_blank"></a>}
        />
      </div>
      <div className="docs-static-header__link">
        <Link id="home" to="/">
          Docs Home
        </Link>
      </div>
    </Container>
  </header>
);

export default StaticHeader;
