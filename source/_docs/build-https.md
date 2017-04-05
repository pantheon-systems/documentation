---
title: Developing with HTTPS
description: Develop Drupal or WordPress sites using HTTPS on Pantheon environments.
tags: [security]
categories: [golive]
---
## Switch to HTTPS
Every free Pantheon development site comes ready to roll with HTTPS for development. If you're viewing your site at `http://dev-yoursite.pantheonsite.io`, simply switch your connection mode to HTTPS by visiting `https://dev-yoursite.pantheonsite.io`.

To make sure that HTTPS is used every time you visit a site, add logic to `settings.php` or `wp-config.php` to [redirect all incoming requests to HTTPS](/docs/redirects/).

## Update Older Domains
Older sites with domain names like `dev.mysite.gotpantheon.com` (a dot rather than a dash in the prefix) can benefit from using the new style. This will prevent HTTPS warnings. Contact support if you have an older domain name and would like it to be reformatted.

<div class="alert alert-info" role="alert">
<h4 class="info">Note</h4>
<p>All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.</p></div>
