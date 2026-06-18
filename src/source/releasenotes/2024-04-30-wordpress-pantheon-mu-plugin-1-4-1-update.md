---
title: WordPress and Pantheon MU Plugin v1.4.1 update
published_date: "2024-04-30"
categories: [wordpress, plugins, action-required]
---

We have updated the WordPress core upstreams (WordPress and WordPress (Composer Managed)) to provide a new `PANTHEON_HOSTNAME` constant. This value can be helpful when defining `DOMAIN_CURRENT_SITE` on WordPress multisite installations. By default, the `PANTHEON_HOSTNAME` constant is set to the value of the `HTTP_HOST` server variable, which is the hostname of the request. However, when this value is unavailable, the `PANTHEON_HOSTNAME` provides fallback values, thereby avoiding "Undefined index: HTTP_HOST" warnings. For more information, refer to our [WordPress Multisite configuration guide](/guides/multisite/config).

The latest [1.4.1 release](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin updates the recommended configuration for  WordPress multisite to use the new `PANTHEON_HOSTNAME` constant when defining `DOMAIN_CURRENT_SITE` rather than the previous recommendation -- either `$_SERVER['HTTP_HOST']` or a complicated PHP switch.