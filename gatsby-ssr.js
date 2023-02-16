import React from 'react'

/*
 * Add global scripts to ensure Bootstrap and jQuery JS is included
 */
export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key="jquery" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js" />,
    <script key="bootstrap" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />,
    <script key="twitter" src="https://platform.twitter.com/widgets.js" />,
    // OneTrust Cookies Consent Notice start for docs.pantheon.io
    <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"  type="text/javascript" charset="UTF-8" data-domain-script="fba5027b-04c0-4165-8778-4e10fb9f5fa3-test" ></script>,
    // OneTrust Cookies Consent Optanon Wrapper
    <script type="text/javascript">
        function OptanonWrapper() {window.dataLayer.push({event:'OneTrustGroupsUpdated'})}
    </script>,
    // Segment
    <script>
        !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="kDdX1dpmsAWuUn8zb1QDJR8YGbWJjKoj";;analytics.SNIPPET_VERSION="4.15.3";
        analytics.load("kDdX1dpmsAWuUn8zb1QDJR8YGbWJjKoj");
        analytics.ready(function() {
            window.dataLayer.push({
                'event': 'segment_analytics_loaded'
            });
        });
        analytics.page();
        }}();
    </script>,
    // Google Tag Manager
    <script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MDF545G');
    </script>
  ])
}
