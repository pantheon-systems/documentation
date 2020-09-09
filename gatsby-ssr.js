import React from 'react'

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="jquery" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />,
    <script key="bootstrap" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />,
    <script src="https://d6ddm2cjqbz6v.cloudfront.net/atp.js" async />,
    // OneTrust Banner
    <script src="https://cdn.cookielaw.org/langswitch/1e0d58d8-3a15-4544-a10a-efd792ffe07f.js" type="text/javascript" charSet="UTF-8" />,
      function OptanonWrapper() { },

  ])
}