---
title: Developing with SSL
description: Learn how to develop Drupal or WordPress sites using SSL and HTTPS on Pantheon environments.
category:
  - developing
keywords: https, ssl, develop with ssl, develop with https, encryption, security, enable ssl, enable ssl on dev, add ssl to dev, add https to dev, add https to environment, add ssl to environment
---
Every free Pantheon development site comes ready to roll with SSL for development. Simply switch your connection method to HTTPS and your `dev-yoursite.pantheon.io` domain will work.

Older sites with domain names like `dev.mysite.gotpantheon.com` (a dot rather than a dash in the prefix) can benefit from being reset to use the new style. This will prevent SSL warnings. Contact support if you have an older-style domain name and would like it to be reformatted.

<div class="alert alert-info" role="alert">
<strong>Note</strong>: All traffic within the Pantheon infrastructure, from Varnish to application containers, is encrypted.</div>

For more information on managing redirection to HTTPS, see [redirecting incoming requests](/docs/articles/sites/code/redirect-incoming-requests/).
