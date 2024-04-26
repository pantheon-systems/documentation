---
title: Pantheon MU Plugin v1.4.0 update
published_date: "2024-04-25"
categories: [wordpress, plugins]
---

With the latest [1.4.0 release](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin, we have updated the default cache max-age used to one week. Previously, the default value was 10 minutes. This change is intended to improve the performance by increasingly the likelihood that an unexpired cached copy of a page is present within the CDN. Often such increases in max-age settings carry the risk that site visitors see stale content that should be replaced by newly published posts. Pantheon greatly mitigates this risk with The [Pantheon Advanced Page Cache](https://wordpress.org/plugins/pantheon-advanced-page-cache) plugin. This plugin granularly clears cached responses using post IDs and other metadata. We highly recommend using the Pantheon Advanced Page Cache plugin to ensure that your site is performing optimally.

This change does _not_ change the max age for _existing_ sites that have already saved their max age (formerly displayed as TTL) value.

You can modify this new default value using a filter built into the MU Plugin. For more information refer to our [WordPress Cache Plugin Configuration](/guides/wordpress-configurations/wordpress-cache-plugin#override-the-default-max-age).

Included in this release are some changes to the Site Health page in the WordPress admin dashboard. We have removed recommended Site Health tests that were previously recommending things that were not possible on Pantheon's read-only filesystem and we have added new tests that check your Redis object cache configuration. If Redis is not enabled for a site, you will see a recommendation in the Site Health page, and you will see new recommendations if Redis is active but you are not using an object caching plugin like [Object Cache Pro](/object-cache/wordpress).

Finally, 1.4.0 adds a filter that allows you to skip cache control headers for specific requests. This is useful if you have a specific page that you do not want to cache. For more information refer to our [GitHub repository documentation](https://github.com/pantheon-systems/pantheon-mu-plugin?tab=readme-ov-file#hooks). Special thanks to [Eric Caron](https://github.com/ecaron) for [contributing the suggestion](https://github.com/pantheon-systems/pantheon-mu-plugin/issues/37) that became the `pantheon_skip_cache_control` filter.