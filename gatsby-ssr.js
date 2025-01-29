import React from 'react';

// Import PDS Global wrapper for applying global context providers.
import { GlobalWrapper } from '@pantheon-systems/pds-toolkit-react';
import { MOBILE_MENU_BREAKPOINT } from './src/vars/responsive';

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      key="jquery"
      src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"
    />,
    <script
      key="bootstrap"
      src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
    />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />,

    // OneTrust Banner
    <script
      src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
      type="text/javascript"
      charset="UTF-8"
      data-domain-script="fba5027b-04c0-4165-8778-4e10fb9f5fa3"
    />,
    function OptanonWrapper() {
      window.dataLayer.push({ event: 'OneTrustGroupsUpdated' });
    },
  ]);
};

// Global context providers.
export const wrapRootElement = ({ element }) => {
  return (
    <GlobalWrapper mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}>
      {element}
    </GlobalWrapper>
  );
};
