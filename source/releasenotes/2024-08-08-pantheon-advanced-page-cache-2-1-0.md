---
title: WordPress Pantheon Advanced Page Cache 2.1.0 update now available
published_date: "2024-08-08"
categories: [wordpress, plugins]
---

The WordPress Pantheon Advanced Page Cache [v2.1.0](https://github.com/pantheon-systems/pantheon-advanced-page-cache/releases) update is now available. This latest update resolves a bug that caused some sites to set the cache max age to 23 hours regardless of the value set in the WordPress admin as well as a minor update to identify if a filter is being used to override the cache.

### What's new?

* **Enhanced debugging information:** If the [`pantheon_cache_default_max_age` filter](https://github.com/pantheon-systems/pantheon-advanced-page-cache?tab=readme-ov-file#setting-the-cache-max-age-with-a-filter) is being used anywhere in your code, the message that displays in the dashboard that the filter is in use will now attempt to display the callable function that is hooked to the filter, providing an easier way to get insights into what is happening.

![Pantheon Advanced Page Cache Max Age filtered message](../images/release-notes/2024/papc-max-age-filtered.png)

Upgrade the plugin now to take advantage of these improvements and make the most of Pantheon's edge caching layer.
