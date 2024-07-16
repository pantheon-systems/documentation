import React from 'react'

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {

  const components = [
    <script key="jquery" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />,
    <script key="bootstrap" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />,
  ];

  // // add the cookie banner script only when doing a full build, not in development
  if (process.env.NODE_ENV !== 'development') {
    components.push(
      <script key="cookie-banner" src="https://pantheon.io/cookie-banner.js" />
    );
    components.push(
      function OptanonWrapper() {
        window.dataLayer.push({'event':'OneTrustGroupsUpdated'})
      }
    );
  }

  setPostBodyComponents(components);
}
