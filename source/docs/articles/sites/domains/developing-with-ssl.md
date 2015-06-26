---
title: Developing with SSL
description: Learn how to develop Drupal or WordPress sites using SSL and HTTPS on Pantheon environments.
keywords: https, ssl, develop with ssl, develop with https, encryption, security, enable ssl, enable ssl on dev, add ssl to dev, add https to dev, add https to environment, add ssl to environment
---
##Switch to HTTPS
Every free Pantheon development site comes ready to roll with SSL for development. If you're viewing your site at `http://dev-yoursite.pantheon.io`, simply switch your connection mode to HTTPS by visiting `https://dev-yoursite.pantheon.io`. To make sure that HTTPS is used every time you visit a site, add logic to `settings.php` or `wp-config.php` to [redirect all incoming requests to HTTPS](/docs/articles/sites/code/redirect-incoming-requests/).

##Update Older Domains
Older sites with domain names like `dev.mysite.gotpantheon.com` (a dot rather than a dash in the prefix) can benefit from being reset to use the new style. This will prevent SSL warnings. Contact support if you have an older-style domain name and would like it to be reformatted.

<div class="alert alert-info" role="alert">
<strong>Note</strong>: All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.</div>
