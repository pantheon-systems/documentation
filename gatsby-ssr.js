import React from 'react'

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="jquery" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />,
    <script key="bootstrap" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />,
    <script type="text/plain" class="optanon-category-2" src="https://crometrics-assets.s3.us-east-2.amazonaws.com/ATP/1.1.5/atp.pantheon.min.js" async></script>,
    // OneTrust Banner
    <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"  type="text/javascript" charset="UTF-8" data-domain-script="fba5027b-04c0-4165-8778-4e10fb9f5fa3-test" />,
      function OptanonWrapper() {
        window.dataLayer.push({event:'OneTrustGroupsUpdated'})
      }

  ])
}
