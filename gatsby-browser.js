import React from 'react';
import { location, globalHistory } from '@reach/router';

// Import PDS Global wrapper for applying global context providers.
import { GlobalWrapper } from '@pantheon-systems/pds-toolkit-react';
import { MOBILE_MENU_BREAKPOINT } from './src/vars/responsive';

// Import PDS core styles.
import './node_modules/@pantheon-systems/pds-toolkit-react/_dist/css/pds-core.css';
import './node_modules/@pantheon-systems/pds-toolkit-react/_dist/css/pds-layouts.css';
import './node_modules/@pantheon-systems/pds-toolkit-react/_dist/css/pds-components.css';

// Global styles
import './src/styles/main.css';
import './src/styles/custom-glyphicons.css';
import './src/styles/pds-additions.css';

// custom typefaces
import 'prismjs/themes/prism-okaidia.css';

// Code block line numbering
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// Code block shell prompt
import './src/styles/codeBlocks.css';

// TOC generator
import 'tocbot/dist/tocbot.css';
import 'tocbot/dist/tocbot.min.js';

//Segment
export const onRouteUpdate = () => {
  window.locations = window.locations || [document.referrer];
  locations.push(window.location.href);
  window.previousPath = locations[locations.length - 2];
  window.analytics &&
    window.analytics.page({
      url: window.location.href,
      referrer: window.previousPath,
      title: document.title,
    });
  //console.log("Title: ", document.title) //For debugging
};

// Trigger resize event once rendered
export const onInitialClientRender = () => {
  window.dispatchEvent(new Event('resize'));
};

// Global context providers.
export const wrapRootElement = ({ element }) => {
  return (
    <GlobalWrapper mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}>
      {element}
    </GlobalWrapper>
  );
};
