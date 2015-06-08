---
title: Required Reading: Essential Pantheon Documentation
description: Recommended documentation to learn about Pantheon Website Management Platform's technologies.
category:
  - getting-started
keywords: getting started, get started, pantheon, best practices,
---
Pantheon is not web hosting. It is a highly-tuned, distributed, and instantly scalable web platform. Pantheon also integrates development best practices and tools into the platform, to get the developer back to writing code, not configuring servers and carrying pagers.

Though it incorporates many familiar open-source technologies, it may seem different and new. Fear not!

Our tech includes nginx, PHP, Redis, Varnish, Solr and Git&mdash;common tools in web development. You don't have to configure them, but an understanding of how they interact with your applications on Pantheon is important.

## Essential Reading

We have lots of [helpful articles](https://pantheon.io/docs/) to help you build sites on Pantheon, but here is our curated must-read list for developer success.

### Get to Know Pantheon


- [Pantheon Getting Started](/docs/articles/getting-started) guide  

- The Pantheon [workflow](/docs/articles/sites/code/using-the-pantheon-workflow/)

- The [technology](/docs/articles/sites/all-about-application-containers/) behind Pantheon  

- [Known platform considerations](/docs/articles/sites/known-limitations/) on Pantheon  

- How [SSL & HTTPS](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication) are implemented on Pantheon

### Build

- [Importing](/docs/articles/drupal/importing-an-existing-drupal-site-to-pantheon/) a site onto Pantheon  

- Using [SFTP](/docs/articles/local/rsync-and-sftp) (and rsync!)  

- How to work with [settings.php](/docs/articles/drupal/configuring-settings-php) and [wp-config.php](/docs/articles/wordpress/configuring-wp-config-php)

- Using [Drush](/docs/articles/local/drush-command-line-utility) on Pantheon  

- Cron with [WordPress](/docs/articles/wordpress/cron-for-wordpress) and [Drupal](/docs/articles/drupal/cron) on Pantheon  

### Launch
- How to point your [DNS](/docs/articles/going-live/) when going live

### Run
- [Optimizing](/docs/articles/optimizing) for the cloud

- How to enable [New Relic](/docs/articles/sites/newrelic/new-relic-performance-analysis)

- How core [updates](/docs/articles/sites/code/applying-upstream-updates) work (TL;DR: don't use 'drush up' for core!)

- Caching, both with [Varnish](/docs/articles/sites/varnish) and [Redis](/docs/articles/sites/redis-as-a-caching-backend), and how to configure [Drupal Performance Settings.](/docs/articles/drupal/drupal-s-performance-and-caching-settings)
- [CDNs](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/) can make your site faster and protect against DDOS attacks

- SSO, LDAP, Shibboleth, and other [authentication](/docs/articles/sites/code/sso-and-identity-federation/) methods

- Backups: [Set them up](/docs/articles/sites/backups/backup-creation), make them on-demand before you push that bug change, check them from time to time, sleep easy.

### Debug

- Need to debug? Read [PHP Errors and Exceptions](/docs/articles/sites/php-errors-and-exceptions/) and [Errors and Server Responses](/docs/articles/sites/errors-and-server-responses/). FTP onto your site and look in /logs, use [Terminus](https://github.com/pantheon-systems/cli) to tail your watchdog, and use New Relic.



## Support

We love helping developers succeed! We also have limits to the support we can provide. The key to a great relationship is clear expectations of [our support scope](/docs/articles/scope-of-support/).  
