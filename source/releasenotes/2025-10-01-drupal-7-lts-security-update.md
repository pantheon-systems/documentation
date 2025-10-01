---
title: Drupal 7 LTS security update now available
published_date: "2025-10-01"
categories: [drupal, action-required]
---

As part of [Pantheon's Long-Term Support (LTS) for Drupal 7](https://pantheon.io/drupal-7), Drupal 7.104 and 7.105 are now available.

* **7.104**: This backports a prototype pollution fix in the BBQ JavaScript library used by several popular modules, including Views, Overlay and Module Filter. Of the usages inspected, only Overlay was found to be using BBQ in a vulnerable manner. If you cannot upgrade immediately, the issue can be mitigated by uninstalling Overlay module. If Overlay is not installed, then this update is not needed.

* **7.105**: This adds support for PHP 8.4. If you do not run and/or do not plan to run your site on PHP 8.4, you do not need this update. Because of the many deprecation notices added to PHP 8.4, it is recommended that `ini_set('error_reporting', E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED)` or some equivalent is added to the site.

In order to swiftly provide security coverage for the vulnerability, both updates have been included in the (7.105)[https://github.com/pantheon-systems/drops-7/releases/tag/7.105] tag for the drops-7 upstream. 

### Action required

Apply the latest upstream update to your Drupal 7 site to receive these updates. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

### About Drupal 7 Long-Term Support

Pantheon has partnered with Tag1 Consulting to deliver security updates and maintenance for Drupal 7 sites until at least January 5, 2027. This extended support is included at no additional cost.

For configuration guidance and detailed information, visit our [related documentation](/supported-drupal/#drupal-7-long-term-support).
