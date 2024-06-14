---
title: New Relic PHP agent v10.19.0.9 now available with PHP 8.3 compatibility and other fixes
published_date: "2024-05-06"
categories: [tools-apis, action-required]
---

The New Relic PHP agent has been updated to the latest version (v10.19.0.9). Compared with the previously available version on the platform (v10.10.0.1), some of the changes and fixes include:

* Drupal 9.4+ now reports hooks and modules (see below for more details)
* Resolved erroneous deprecation warnings for PHP 8.1+
* Support for PHP 8.3

See the [complete New Relic PHP agent changelog](https://docs.newrelic.com/docs/release-notes/agent-release-notes/php-release-notes/) for more details.

[Learn More about New Relic](/guides/new-relic), real-time performance monitoring for your Pantheon web applications. 

## Action Required: Default behavior of New Relic Drupal metrics has changed

Pantheon no longer supports Drupal-specific metrics in New Relic by default. However, the functionality is still available. If this is crucial for troubleshooting your sites, please add these lines to your site’s `pantheon.yml` file to enable this reporting:

```
new_relic:
  drupal_hooks: true
```

Our support team is happy to help if you have any questions or need assistance.
