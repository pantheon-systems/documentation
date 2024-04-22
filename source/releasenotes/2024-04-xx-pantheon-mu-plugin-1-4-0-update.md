---
title: Pantheon MU Plugin v1.4.0 update
published_date: "2024-04-xx"
categories: [wordpress, plugins]
---

With the latest [1.4.0 release](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin, we have updated the default cache TTL to one week. Previously, the default value was 10 minutes. This change is intended to improve the performance of your site by reducing the number of cache clears that are run automatically. The [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) plugin auto-clears content when pages are published or updated which is why we are increasing the default TTL. We highly recommend using the Pantheon Advanced Page Cache plugin to ensure that your site is performing optimally.

This change does _not_ change the TTL for _existing_ sites that have already saved their TTL value.

You can modify this new default value using a filter built into the MU Plugin. For more information refer to our [WordPress Cache Plugin Configuration](/guides/wordpress-configurations/wordpress-cache-plugin#override-the-default-ttl).

Also included in this release are some changes to the Site Health page in the WordPress admin dashboard. We have removed recommended Site Health tests that were previously recommending things that were not possible on Pantheon's read-only filesystem and we have added new tests that check your Redis object cache configuration. If Redis is not enabled for a site, you will see a recommendation in the Site Health page, and you will see new recommendations if Redis is active but you are not using an object caching plugin like [Object Cache Pro](/object-cache/wordpress).