---
title: Going Live
subtitle: Enable HTTPS
golive: true
anchorid: https
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/https/
nexturl: guides/going-live/redirects/
nextpage: Redirect to a Primary Domain
previousurl: guides/going-live/domains/
previouspage: Connect a Domain
editpath: going-live/04-https.md
---
In this lesson, we’re going to ensure our site is using the best practice of HTTPS.  This is optional but will be enabled by default on all Professional and Business sites.   

<div class="panel panel-video panel-guide">
  <script src="//fast.wistia.com/embed/medias/pugjxn19gi.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><div class="wistia_embed wistia_async_pugjxn19gi videoFoam=true" style="height:100%;width:100%">&nbsp;</div></div></div>
</div>

1. Professional and Business Plans are automatically given HTTPS without any other setup required.  

    * The sites will be using HTTPS by default.  For example, if you use all the provided settings without modifying anything you will reach https://www.example.com even if you just enter www.example.com as the URL.
    * If you have a use case where you would not want to have SSL, you can disable HTTPS if desired.

        * Navigate to Domains and HTTPS
        * Click on the ‘https://’ drop-down and select ‘http://’

    * If have a use case where you need to own your own certificate and upload it to Pantheon directly, you will need to contact support to make this arrangement.  This will incur a $30 per month additional fee since additional infrastructure will need to be set up to enable this ability..  


2. Personal Plans are not provided with a certificate by Pantheon.  Instead we recommend that all sites leverage a CDN option to manage SSL globally for these sites. This is most often a free option and if you are already leveraging a CDN it might only require a few short option changes.  

    * Most major CDN’s provide this service, such as Fastly, Cloudflare, MaxCDN, or Cloudfront as a few examples.  
    * We have written a guide specific to our partner Cloudflare for achieving SSL on your sites.  Follow those directions here: https://pantheon.io/docs/guides/cloudflare-enable-https/
    * Additional DNS configuration is likely required from your CDN.  
