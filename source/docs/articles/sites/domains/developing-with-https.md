---
title: Developing with HTTPS
description: Learn how to develop Drupal or WordPress sites using HTTPS on Pantheon environments.
keywords: https,  develop with HTTPS, develop with https, encryption, security, enable ssl, add https to dev, add https to environment
---
## Switch to HTTPS
Every free Pantheon development site comes ready to roll with HTTPS for development. If you're viewing your site at `http://dev-yoursite.pantheon.io`, simply switch your connection mode to HTTPS by visiting `https://dev-yoursite.pantheon.io`.

To make sure that HTTPS is used every time you visit a site, add logic to `settings.php` or `wp-config.php` to [redirect all incoming requests to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/).

## Update Older Domains
Older sites with domain names like `dev.mysite.gotpantheon.com` (a dot rather than a dash in the prefix) can benefit from using the new style. This will prevent HTTPS warnings. Contact support if you have an older domain name and would like it to be reformatted.

<div class="alert alert-info" role="alert">
<h4>Note</h4>
All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.</div>
