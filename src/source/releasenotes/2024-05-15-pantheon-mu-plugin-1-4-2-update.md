---
title: Pantheon MU Plugin v1.4.2 update
published_date: "2024-05-15"
categories: [wordpress, plugins]
---

The latest [1.4.2 update](https://github.com/pantheon-systems/pantheon-mu-plugin/releases) of the Pantheon MU Plugin is now available. This update fixes a bug in the `pantheon_cache_default_max_age` filter added in 1.4.0 where the filtered value was not being used in the cache control headers. This bug was found by [Brian Perondi](https://github.com/brianperondi) and surfaced in our [Community Slack Workspace](/pantheon-community). We appreciate the report and the fix will be available with the next WordPress release. Composer-based WordPress installs can get the update right away by running `composer update`.
