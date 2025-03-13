import React from 'react';
import './style.css';
import Header from '../header';
import Footer from '../footer';
import { DocsSidebarLayout } from '../../pds-middleware/DocsSidebarLayout/DocsSidebarLayout';
// Local utilities.
import { initiateSlots } from '../../pds-middleware/pds-utils';

const GuideLayout = ({ children, pageType = 'default' }) => {
  // Initiate slots.
  const slots = initiateSlots(children);

  // Assign content to named slots.
  const pageSEO = slots['seo'];
  const guideMenu = slots['guide-menu'];
  const guideContent = slots['guide-content'];

  return (
    <div className="pantheon-docs">
      <Header page={pageType} />
      {pageSEO}
      <DocsSidebarLayout
        gridGap="narrow"
        sidebarLocation="left"
        className="pds-container pds-container--x-wide"
      >
        <div slot="sidebar" className="guide-sidebar">
          {guideMenu}
        </div>
        <div slot="content" className="guide-content">
          {guideContent}
        </div>
      </DocsSidebarLayout>
      <Footer className="with-border" />
    </div>
  );
};

export default GuideLayout;
