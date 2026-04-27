---
title: Pantheon MU Plugin v1.5.6 now available with revised update strategy 
published_date: "2026-04-27"
categories: [wordpress, plugins]
---

The [Pantheon MU Plugin](https://github.com/pantheon-systems/pantheon-mu-plugin) v1.5.6 is now available. 

WordPress sites can apply this update by [applying upstream updates](/core-updates) from the dashboard or via Terminus. [WordPress (composer managed)](/guides/wordpress-composer) sites can upgrade using `composer update` or by checking for updates in the dashboard.

## Revised MU Plugin update strategy
Starting with this release, MU Plugin updates are deployed as standalone commits to the [WordPress upstream](https://github.com/pantheon-systems/WordPress), independent of WordPress core version updates. WordPress sites will now receive MU Plugin updates more frequently and as discrete, visible changes in the dashboard — rather than bundled with core version bumps.

## What's new?

This release spans two MU Plugin versions, with updates concerning [WordPress sites running Elasticsearch on Pantheon](/guides/pantheon-search/elasticsearch):

**[1.5.5](https://github.com/pantheon-systems/pantheon-mu-plugin/releases/tag/1.5.5)**

- Fixes an issue where `wp elasticpress sync` CLI commands indexed content with `http://` image URLs instead of `https://`, causing broken images on the HTTPS frontend. A `pantheon_elasticpress_force_https_in_cli` filter is available for sites that need to opt out of this behavior.

**[1.5.6](https://github.com/pantheon-systems/pantheon-mu-plugin/releases/tag/1.5.6)**

- Fixes ElasticPress Autosuggest and Instant Results on sites using ElasticPress.io by routing browser-side search requests to the public host rather than an internal proxy URL that browsers cannot reach.

**WordPress upstream**

- `WP_HOME` and `WP_SITEURL` definitions in `wp-config-pantheon.php` are now conditional, so customer-defined values are respected and PHP notices are no longer generated when these constants are already set before `wp-config-pantheon.php` is included.
