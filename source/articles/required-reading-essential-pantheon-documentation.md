---
title: Required Reading: Essential Pantheon Documentation
description: Recommended documentation to learn about Pantheon's technologies.
parent_guide:
  - getting-started
    filename:source/_guides/required-reading-essential-pantheon-documentation.md
---

## Overview

Pantheon is unlike any traditional web hosting service that you may have used in the past.

Though it incorporates many familiar open-source technologies, it presents a fresh and unique deployment topology, matched with a highly-functional toolbox and uber-efficient workflow to create an all-in-one cloud-based development solution for Drupal.  


Pantheon's technologies include nginx, PHP, Redis, Varnish, Solr and Git. We know many developers are familiar with the technologies used by Pantheon, but to gain a proper understanding of how these technologies interact on Pantheon, and how they will play into your Drupal development, we highly recommend reading through the documentation provided below.

## Helpful Docs

We have lots of helpful docs [here](http://helpdesk.getpantheon.com/), but an efficient Developer on Pantheon should quickly understand:

- [Known platform considerations](/documentation/running-drupal/known-limitations/) on Pantheon.
- The [Pantheon Getting Started](/documentation/howto/pantheon-101-getting-started/-pantheon-101-getting-started) guide exists.
- The [technology](/documentation/advanced-topics/all-about-application-containers/) behind Pantheon.
- The Pantheon [Workflow](/documentation/howto/using-the-pantheon-workflow/).
- Using [SFTP](/documentation/advanced-topics/rsync-and-sftp/-rsync-and-sftp) (and rsync!).
- [Importing](/documentation/advanced-topics/importing-an-existing-drupal-site-to-pantheon/) a site onto Pantheon.
- How to enable [New Relic](/documentation/howto/new-relic-performance-analysis-on-pantheon/-enabling-new-relic).
- [Optimizing](/documentation/getting-started/optimization-for-pantheon-and-the-cloud/-optimization-for-pantheon-and-the-cloud) for the cloud.
- How to work with [Settings.php](/documentation/howto/configuring-settings-php/-working-with-settings-php)
- Backups: [Set them up](/documentation/getting-started/backup-creation/-creating-a-backup), make them on-demand before you push that bug change, check them from time to time, sleep easy.
- Need to debug? Read [this](/documentation/getting-started/php-errors-and-exceptions/) and [this](/documentation/getting-started/errors-and-server-responses/), FTP onto site and look in /logs, use drush to tail your watchdog, and use New Relic.
- Using [Drush](/documentation/advanced-topics/drush-command-line-utility/-using-drush-on-pantheon) on Pantheon.
- [Cron](/documentation/howto/cron-on-pantheon/) and Pantheon.
- How core [updates](/documentation/running-drupal/drupal-core-updates/-core-updates) work (TL;DR: don't use 'drush up' for core!).
- Caching, both with [Varnish](/documentation/advanced-topics/varnish-caching-for-high-performance/-working-with-varnish-on-pantheon) and [Redis](/documentation/howto/redis-as-a-caching-backend/-understanding-redis-cache
) and how to configure [Drupal Performance Settings.](/documentation/running-drupal/drupal-s-performance-and-caching-settings/-drupal-s-performance-settings)
- [CDN](/documentation/advanced-topics/content-delivery-network-cdn-for-file-distribution/)s can make your site faster, and protect you from DDOS attacks.
- How [SSL & HTTPS](/documentation/howto/adding-a-ssl-certificate-for-secure-https-communication/-getting-an-ssl-cert) are implemented on Pantheon.
- How to properly point your [DNS](/documentation/running-drupal/going-live-and-launching-your-site/) when going live.
- SSO, LDAP, Shibboleth and other [authentication](/documentation/advanced-topics/sso-and-identity-federation-on-pantheon/) methods.
- Pantheon servers spin down after ~2 hours of idle time. On receiving a web request, they are spun up, usually within 30 seconds. If you try to connect to the backend, you may experience an error. Load the home page, and you can connect.

## Support

We love helping developers succeed! We also have limits to the support we can provide. The key to a great relationship is clear expectations of our support scope.  

- We don't touch client code.
- We love adding features, but platform changes take time and consideration, and unfortunately feature requests are often declined if there is potential performance or user experience degradation.
- Pantheon provides a great backend, but can not provide code-level debugging, GIT training, or site architecture recommendations. New Relic and debugging can get you pretty far.
- If your site is slow or modules aren't working, please see our debugging tutorials. Issues with the platform are posted on our [status page](http://status.getpantheon.com). If there are no platform events, the solution is probably within the site's code.
- Pantheon can only assist if we can replicate the problem. "Intermittent issues" and server errors are rarely random, rather, they are issues with a yet undefined trigger. Please try to replicate and debug [site errors](/documentation/getting-started/errors-and-server-responses/), etc. in your development environment.
- We recommend development on the platform, rather than on a local environment, whenever possible. Unexpected behavior, not apparent on local instances such as MAMP or shared hosting, can be due to different versions of PHP, different levels of error reporting, or server configuration. Pantheon is not responsible for resolving such issues.
- Pantheon support can quickly determine if an issue is platform related. We take full responsibility for our services and performance, but if something is affecting your site only, or a single environment only, we will most likely refer you to our debugging tutorials.
- If we see your site is a volcano of errors or overloading resources, we will contact you and ask you to take immediate action. If unresponsive, we may need to put the site into maintenance mode.
