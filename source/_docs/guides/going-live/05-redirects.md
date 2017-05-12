---
title: Going Live
subtitle: Redirect to a Primary Domain
golive: true
anchorid: redirects
generator: pagination
layout: guide
pagination:
    provider: data.goinglivepages
use:
    - goinglivepages
permalink: docs/guides/going-live/redirects/
nexturl: guides/going-live/launch-check/
nextpage: Final Launch Check
previousurl: guides/going-live/redirects/
previouspage: Enable HTTPS
editpath: going-live/05-redirects.md
---
In this lesson, we’re going to ensure our site is redirecting to a single domain to prevent content duplication across domains.

1. At this point, you should have your domain added to the site Dashboard and pointed to Pantheon.

    * The final step is to redirect requests to a single domain name for improved SEO. If misconfigured, your site might be served from multiple domains, such as www and the bare domain. This is bad for SEO because search engines don’t know which URL to show in search results. It’s further compounded if people start linking to both pages.  
    * Pantheon provides the mechanism to assure that this redirection happens, using the drop down in the Site dashboard.  


2. On the Site Dashboard click into the Domains & HTTPS tab and look for the sentence “Set the primary domain and redirect all domain traffic” which proceeds 2 different drop down menus.

    * http/https
    * ---/yoursite.com/www.yoursite.com   

3. Using the dropdown menu decide if you want all traffic to redirect to bare domain (example.com) or www (www.example.com)
