---
title: Point Domains to Pantheon
description: Add a domain and configure DNS on Pantheon.
videoid: h840dbemsi
contributors:  [scottmassey]
permalink:  docs/videos/:basename/
tags: [dns]
type: video
categories: [develop, cli]
layout: video
---
One of the final steps to [going live](/docs/go-live) is [pointing a custom domain name](/docs/domains) at the Pantheon site. Let’s cover the simplest scenario of how to do this using HTTP.

The domain we have purchased from our preferred domain name provider is all-the-marbles.website.

At the very least, we will need to set up the bare domain and the www.all-the-marbles.website sub-domain. The domain that I want to show in the toolbar is the WWW.

To add a custom domain, first I add a credit card, if I haven’t already, and select s paid non-sandbox plan. Then I navigate to my Live environment’s domain tab. I enter all my domain names and click Add.

Now any incoming requests to the WWW sub-domain will automatically be re-routed to the Live environment, which is at pantheonsite.io. Any requests to the bare domain will also be redirected to the Live environment.


Next it’s a best practice to modify your `settings.php` or `wp-config.php` to redirect requests to a common domain as shown here.

Finally let’s point DNS at Pantheon using Namecheap, the DNS registrar I bought this compelling multi-hyphenated domain name from. I navigate to this section where I can add and edit DNS records. And I create a CNAME record for the WWW subdomain. The bare domain can often be redirected here at the DNS level to WWW or pointed at the IP address in the domains tab of my dashboard. I’ll set a low TTL of 5 minutes for the first 48 hours or so, then increase it when I’ve confirm that it’s resolving as expected.


After I give my settings time to propagate, the Pantheon site will load using my custom domain. Follow these steps and your site will be live in no time. And check out our docs for info on going live with SSL, CDNs, and more.
