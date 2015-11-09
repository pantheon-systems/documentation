---
title: Required Reading: Essential Pantheon Documentation
description: Recommended documentation to learn about Pantheon Website Management Platform's technologies.
category:
  - getting-started
keywords: getting started, get started, pantheon, best practices,
---
Pantheon is not web hosting. It is a highly-tuned, distributed, and instantly scalable web platform. Pantheon also integrates development best practices and tools into the platform, to get the developer back to writing code, not configuring servers and carrying pagers.

Our tech includes nginx, PHP, Redis, Varnish, Solr and Git&mdash;common tools in web development. You don't have to configure them, but an understanding of how they interact with your applications on Pantheon is important. Review the following must-read list to ensure developer success.

## Get to Know Pantheon

- [Getting Started](/docs/articles/getting-started)  
- [Using the Pantheon Workflow](/docs/articles/sites/code/using-the-pantheon-workflow/)
- [All About Application Containers](/docs/articles/sites/all-about-application-containers/)
- [Platform Considerations](/docs/articles/sites/platform-considerations/)  
- [Enable Secure HTTPS Communication](/docs/articles/sites/domains/adding-a-ssl-certificate-for-secure-https-communication)
<div class="alert alert-info">
<h4>Note</h4>
Pantheon containers spin down after ~1 hour of idle time. Live environments on a paid plan will spin down after 12 hours of idle time. On receiving a web request, they are spun up, usually within 30 seconds. If you try to connect to the database, you may experience an error. Load the home page, and you can connect.
</div>
## Build
- [Migrate Sites to Pantheon](/docs/articles/sites/migrate/)  
- [rsync and SFTP](/docs/articles/local/rsync-and-sftp)
- [Configuring settings.php](/docs/articles/drupal/configuring-settings-php) or [Configuring wp-config.php](/docs/articles/wordpress/configuring-wp-config-php)
- [Drupal Drush Command-Line Utility](/docs/articles/local/drupal-drush-command-line-utility)
- [Cron for WordPress](/docs/articles/wordpress/cron-for-wordpress) or [Cron for Drupal](/docs/articles/drupal/cron)

## Launch
- [Going Live](/docs/articles/going-live/)
- [Domains and DNS](/docs/articles/sites/domains)
## Run
- [Optimization for Pantheon and the Cloud](/docs/articles/optimizing)
- [New Relic Performance Analysis on Pantheon](/docs/articles/sites/newrelic/new-relic-performance-analysis)
- [Applying Upstream Updates](/docs/articles/sites/code/applying-upstream-updates)
- [Varnish Caching for High Performance with Drupal and WordPress](/docs/articles/sites/varnish)
- [Redis as a Caching Backend](/docs/articles/sites/redis-as-a-caching-backend)
- [Drupal 7 Performance and Varnish Caching Settings](/docs/articles/drupal/drupal-performance-and-caching-settings)
- [Content Delivery Network (CDN) for File Distribution](/docs/articles/drupal/content-delivery-network-cdn-for-file-distribution/)
- [SSO and Identity Federation on Pantheon](/docs/articles/sites/code/sso-and-identity-federation/)
- [Backup Creation](/docs/articles/sites/backups/backup-creation)

## Debug

- [PHP Errors and Exceptions](/docs/articles/sites/php-errors-and-exceptions/)
- [Errors and Server Responses](/docs/articles/sites/errors-and-server-responses/)

## Support

- [Scope of Support](/docs/articles/scope-of-support/)
- [Getting Support](/docs/articles/getting-support)
