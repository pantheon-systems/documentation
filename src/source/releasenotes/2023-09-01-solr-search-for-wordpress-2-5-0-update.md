---
title: "Solr Search for WordPress 2.5.0 Update"
published_date: "2023-09-01"
categories: [wordpress, action-required, performance]
---
We released an update for the [Solr Search for WordPress plugin](https://wordpress.org/plugins/solr-power/) which disables auto-commit by default and allows cron to push solr commits regularly instead.

This drastically improves the performance of large sites and avoids 503 errors related to hard committing on every update. This update is recommended for all WordPress sites currently running the plugin.

You can still enable auto-commit by explicitly setting `SOLRPOWER_DISABLE_AUTOCOMMIT` to `false`.
