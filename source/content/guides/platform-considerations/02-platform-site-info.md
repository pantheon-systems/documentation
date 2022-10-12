---
title: Platform Considerations
subtitle: Platform and Site Information
description: Learn about platform and site-specific configuration and support.
categories: [platform]
tags: [files, libraries, security, webops]
contributors: [whitneymeredith]
layout: guide
showtoc: true
permalink: docs/guides/platform-considerations/platform-site-info
anchorid: platform-site-info
---

This section provides information on Pantheon platform support for domain masking, htaccess, and many other configuration and site support considerations.


## CORS

Pantheon supports sites that consume services using Cross-Origin Resource Sharing (CORS), such as Amazon S3 CORS.

You must add the correct header to enable CORS services on your site. Review [https://enable-cors.org/server_php.html](https://enable-cors.org/server_php.html) for more details.

WordPress users can enable CORS for selected domains in a [MU plugin](/mu-plugin#cross-origin-resource-sharing-cors). You can also use an Advanced Global CDN to [modify headers at the Edge](/guides/professional-services/advanced-global-cdn#modify-and-filter-headers-at-the-edge).

Drupal 9 users can update `sites/default/services.yml` to enable CORS.

Sample `services.yml` file:

```yml:title=sites/default/services.yml
  cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['x-csrf-token','authorization','content-type','accept','origin','x-requested-with', 'access-control-allow-origin','x-allowed-header','*']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['http://localhost/','http://localhost:3000','http://localhost:3001','http://localhost:3002','*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: false
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: true
```


## CSS Preprocessors

Pantheon does not currently support LESS or Sass/Compass CSS preprocessor languages. LESS and Sass will need to be pre-compiled to make traditional CSS stylesheets before being pushed to the platform.

## Database Stored Procedures

<Partial file="platform-considerations-connections.md" />

MySQL stored procedures are not supported. Due to the nature of the platform, there is no guarantee that they will  persist following a database migration. You can avoid the use of stored procedures by using parameterized queries or [object-relational mapping](https://en.wikipedia.org/wiki/Object-relational_mapping).

MySQL [Triggers](https://dev.mysql.com/doc/refman/8.0/en/triggers.html) and [Events](https://dev.mysql.com/doc/refman/8.0/en/events-overview.html) are also not supported. As an alternative, you may consider Cron for [WordPress](/wordpress-cron) or [Drupal](/drupal-cron).

## Drupal 7 and Ampersands

A Drupal 7 site with an ampersand (`&`) in the site URL (excluding instances of query parameter separation) will return a 404 error, regardless of the presence of a matching path.

Ensure you encode URLs that use ampersands with `%26` instead of `&`.

## Drupal Steward

The Pantheon platform includes [Drupal Steward](https://www.drupal.org/drupal-security-team/steward), a platform-level mitigation of certain highly-critical vulnerabilities that are identified in Drupal core, as a feature for all Drupal sites on Pantheon. All Pantheon sites are protected by Drupal Steward.

Refer to the [Drupal Steward FAQ](https://www.drupal.org/drupal-security-team/steward/faq) for more information about Drupal Steward.

## .htaccess

Pantheon sites use nginx to concurrently serve requests. The nginx web server ignores distributed configuration files such as `.htaccess` for reduced resource consumption and increased efficiency. This configuration is standard across all Pantheon sites, and modifications to the `nginx.conf` file are not supported.

Refer to [Configure Redirects](/guides/redirect/#php-vs-htaccess) for more information.

If your site contains rules in `.htaccess` that cannot be migrated to PHP, Pantheon offers its [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) as a managed service. Custom `.htaccess` rules often can be converted to run on a custom Varnish layer provided by Advanced Global CDN. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

### Drupal False Positive

Drupal 7 and 8 checks for arbitrary code execution prevention by looking for a specific string in the `.htaccess` file. Since Pantheon uses NGINX as described above, this message can be safely ignored. For more details, refer to [this Drupal.org issue](https://www.drupal.org/project/drupal/issues/2150399) on `SA-CORE-2013-003`.

## Inactive Site Freezing

Sandbox sites that are over four months old that have not had code commits or other Git activity for three months are "frozen". All requests to a frozen site will return a `530 Site Frozen` error code, and the site's Dashboard will be unavailable.

You can easily reactivate a site:

1. Navigate to your Pantheon User Dashboard, and select the frozen site in the Dashboard. 

1. Click **Unfreeze site**. The site will be ready for development again within a few minutes. 

If you experience any issues, like missing static assets, a [backup](/guides/environment-configuration/restore-environment-backup#restore-an-environment-from-its-own-backup) of the site is available and can be restored via the Site Dashboard. Please note that only files that have been committed will be available after unfreezing.

## Maintenance Mode

Pantheon may send a [generic Maintenance Mode message](/guides/errors-and-server-responses) during platform problems; this message cannot be customized.

Built-in Maintenance Mode for both Drupal and WordPress sites can be customized; clear caches when toggling.

## MariaDB 10.4 and innodb_strict_mode=ON: Row Size Too Large Errors

MariaDB 10.4 on Pantheon has `innodb_strict_mode` set to `ON`. This leads to `Row size too large` errors that are not present on earlier versions of MariaDB:

```sql
ERROR 1118 (42000): Row size too large (> 8126). Changing some columns to TEXT or BLOB may help. In current row format, BLOB prefix of 0 bytes is stored inline.
```

Modify your tables to use `row_format=DYNAMIC` to avoid this error. 

<Accordion title="How to update all tables to row_format=DYNAMIC" id="row-size-too-large">

<Partial file="row-size-too-large-alter-table.md" />

</Accordion>

Refer to the [official MariaDB documentation](https://mariadb.com/kb/en/troubleshooting-row-size-too-large-errors-with-innodb/) for more information on how to diagnose tables and troubleshoot potential issues. 

## Modules and Plugins with Known Issues

Refer to [Modules and Plugins with Known Issues](/modules-plugins-known-issues) for information about [Drupal modules](/modules-known-issues) and [WordPress plugins](/plugins-known-issues) that are not supported and/or require workarounds.

## Multisite

Pantheon supports designated use cases for [WordPress Site Networks](/guides/multisite) created by WordPress' Multisite feature.

We do not support [Drupal Multisite](https://www.drupal.org/docs/7/multisite-drupal/multi-site-sharing-the-same-code-base). See blog posts: [Why Drupal Multisite is not Enterprise Grade](https://pantheon.io/blog/why-drupal-multisite-not-enterprise-grade) and [Much Ado About Drupal Multisite](https://pantheon.io/blog/much-ado-about-drupal-multisite).

## nginx.conf

Pantheon does not currently support modifying the `nginx.conf` per site, as we run a highly tuned universal configuration file. All of the containers run a standard profile, and we have opted to keep this configuration to keep the `nginx.conf` lean.

Refer to [Configure Redirects](/guides/redirect/#php-vs-htaccess) if your site uses `nginx.conf` rules for redirects. 

Pantheon offers [Advanced Global CDN](/guides/professional-services/advanced-global-cdn) as a managed service if your site contains rules in `nginx.conf` that cannot be migrated to PHP. Custom `nginx.conf` rules often can be converted to run on a custom Varnish layer provided by Advanced Global CDN. Please contact your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs) for more information.

## Node.js

Node.js is not available in the platform. The node.js service must to be hosted on a different remote server outside of Pantheon if running node.js services is a hard requirement for your Drupal or WordPress application.

## One Application per Site

Each site supports a single Drupal or WordPress application. Placing a WordPress application to behave as the blog for a Drupal site, for example, is unsupported.

### Domain Masking or URL Forwarding

Domain masking allows you to serve two entirely different and separate sites over a single common domain. For example, using one system as a front end for marketing efforts and another for blog content:

- Main Site: `https://www.example-site.com/`
- Blog: `https://www.example-site.com/blog/`

Domain masking is available through Pantheon's [Advanced Global CDN](/guides/professional-services/advanced-global-cdn#domain-masking-and-reverse-proxy) managed service. If you require domain masking, ask your Customer Success Manager (CSM) or [contact us](https://pantheon.io/contact-us?docs). Customers may also set up domain masking using a third-party CDN service, but please note that third-party services are outside [Pantheon's scope of support](/guides/support).

### Additional Databases

While you are able to import an additional database to an environment, only the Pantheon database will be preserved when the application container is updated. This means you can use an additional database for running migration scripts, but should not rely on it nor write any new data to it.

## Oracle Database Drivers

Pantheon does not currently support directly connecting to Oracle databases. Customers have successfully used the [Pantheon Secure Integration](https://pantheon.io/features/secure-integration) to connect to an external API on top of their Oracle databases.

## Pantheon URL Search Engine Indexing

This can occur if hardcoded links are found in the HTML source of your pages. 

WordPress users can correct this by: 

1. Run a [search and replace using WP-CLI](/guides/wp-cli) as mentioned in the [WordPress Quick Tip: Search and Replace with WP-CLI](https://pantheon.io/blog/wordpress-quick-tip-search-and-replace-wp-cli/) blog post to exchange the platform domains with your custom domain. 

1. [Add a redirect to the primary domain](/guides/launch/redirects).

## Xdebug Support

Xdebug is not available on the platform. Local development tools such as [Lando](/guides/lando-wordpress) provide Xdebug and can synchronize your local workstation with the Pantheon Cloud. Debugging on the Pantheon Cloud is done using [New Relic&reg; Performance Monitoring](/guides/new-relic).

## More Resources

- [Frequently Asked Questions](/faq)

- [Site Plans FAQs](/site-plans-faq)

- [Pantheon YAML Configuration Files](/pantheon-yml)