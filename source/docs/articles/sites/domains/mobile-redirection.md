---
title: Enable Mobile Redirection with CloudFlare
description: Learn how to use CloudFlare to set up mobile redirection.
category:
  - developing
keywords: dns, cloudflare, mobile, redirect-incoming-requests
---
This article walks you though setting up a mobile redirect service through CloudFlare to automatically redirect visitors using mobile device visitors to a mobile optimized home page.


## Before You Begin

You'll need to have:  
- A [CloudFlare account](https://www.cloudflare.com/a/sign-up)  
- DNS information for the domain you want to redirect

<div class="alert alert-info" role="alert">
<h4>Note</h4>
This will only work for your Live domain. If you want to test it for the Dev or Test environments, you will have to point the Live domain name to Dev or Test on Pantheon.</div>


## Enable Mobile Redirection
1. Log in to your CloudFlare account.
2. Go to the domain you want to set up a mobile redirect for.
3. Click on the **Speed** icon at top of the page.
4. Scroll down to the **Mobile Redirect** section.
5. Set up the mobile domain as needed.
6. Wait a couple of minutes for it to update, then test it by entering the web URL in your mobile device's browser. You should be redirected to the mobile domain you have chosen.
