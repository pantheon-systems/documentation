---
title: Required Reading: Essential Pantheon Documentation
description: Recommended documentation to learn about Pantheon's technologies.
category:
  - getting-started
---

## Overview

Pantheon is not web hosting. It is a highly-tuned, distributed, and instantly scalable web platform. Pantheon also integrates development best practices and tools into the platform, to get the developer back to writing code, not configuring servers and carrying pagers.

Though it incorporates many familiar open-source technologies, it may seem different and new. Fear not!

Our tech includes nginx, PHP, Redis, Varnish, Solr and Git&mdash;common tools in web development. You don't have to configure them, but an understanding of how they interact with your applications on Pantheon is important.

## Essential Reading

We have lots of [helpful articles](https://pantheon.io/docs/) to help you build sites on Pantheon, but here is our curated must-read list for developer success.

### Get to Know Pantheon


[Pantheon Getting Started](/docs/articles/getting-started) guide  

The Pantheon [workflow](/docs/articles/sites/code/using-the-pantheon-workflow/)

The [technology](/docs/articles/architecture/all-about-application-containers/) behind Pantheon  

[Known platform considerations](/docs/articles/sites/known-limitations/) on Pantheon  

How [SSL & HTTPS](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication) are implemented on Pantheon

### Build

 [Importing](/docs/articles/drupal/importing-an-existing-drupal-site-to-pantheon/) a site onto Pantheon  

Using [SFTP](/docs/articles/local/rsync-and-sftp) (and rsync!)  

How to work with [settings.php](/docs/articles/drupal/configuring-settings-php)  

Using [Drush](/docs/articles/local/drush-command-line-utility) on Pantheon  

[Cron](/docs/articles/sites/code/cron/) and Pantheon  

### Launch
How to point your [DNS](/docs/articles/going-live/) when going live

### Run
[Optimizing](/docs/articles/optimizing) for the cloud

How to enable [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis)



How core [updates](/docs/articles/sites/code/applying-upstream-updates) work (TL;DR: don't use 'drush up' for core!)

Caching, both with [Varnish](/docs/articles/architecture/edge/varnish) and [Redis](/docs/articles/sites/redis-as-a-caching-backend), and how to configure [Drupal Performance Settings.](/docs/articles/drupal/drupal-s-performance-and-caching-settings)

 [CDNs](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/) can make your site faster and protect against DDOS attacks

SSO, LDAP, Shibboleth, and other [authentication](/docs/articles/sites/code/sso-and-identity-federation/) methods

Backups: [Set them up](/docs/articles/sites/backups/backup-creation), make them on-demand before you push that bug change, check them from time to time, sleep easy.

### Debug

Need to debug? Read [PHP Errors and Exceptions](/docs/articles/sites/php-errors-and-exceptions/) and [Errors and Server Responses](/docs/articles/sites/errors-and-server-responses/). FTP onto your site and look in /logs, use drush to tail your watchdog, and use New Relic.



## Support

We love helping developers succeed! We also have limits to the support we can provide. The key to a great relationship is clear expectations of our support scope.  

- We don't touch client code.
- We love adding features, but platform changes take time and consideration, and unfortunately feature requests are often declined if there is potential performance or user experience degradation.
- Pantheon provides a great backend, but cannot provide code-level debugging, GIT training, or site architecture recommendations. New Relic and debugging can get you pretty far.
- If your site is slow or modules aren't working, please see our debugging tutorials. Issues with the platform are posted on our [status page](http://status.getpantheon.com). If there are no platform events, the solution is probably within the site's code.
- Pantheon can only assist if we can replicate the problem. "Intermittent issues" and server errors are rarely random, rather, they are issues with a yet undefined trigger. Please try to replicate and debug [site errors](/docs/articles/sites/errors-and-server-responses/), etc. in your development environment.
- We recommend development on the platform, rather than on a local environment, whenever possible. Unexpected behavior, not apparent on local instances such as MAMP or shared hosting, can be due to different versions of PHP, different levels of error reporting, or server configuration. Pantheon is not responsible for resolving such issues.
- Pantheon support can quickly determine if an issue is platform related. We take full responsibility for our services and performance, but if something is affecting your site only, or a single environment only, we will most likely refer you to our debugging tutorials.
- If we see your site is a volcano of errors or overloading resources, we will contact you and ask you to take immediate action. If unresponsive, we may need to put the site into maintenance mode.
- Pantheon servers spin down after ~2 hours of idle time. On receiving a web request, they are spun up, usually within 30 seconds. If you try to connect to the backend, you may experience an error. Load the home page, and you can connect.
