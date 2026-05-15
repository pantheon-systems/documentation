---
title: "New Relic Browser Monitoring for Drupal 10.2+"
published_date: "2026-05-15"
categories: [tools-apis, drupal]
description: "We've made it easier to auto-instrument New Relic Browser Agent monitoring on Drupal 10.2+ sites."
---
We've made it easier to auto-instrument New Relic Browser Agent monitoring on Drupal 10.2+ sites.

Starting in Drupal 10.2, strict `Content-Length` headers were introduced that broke New Relic's standard Browser Agent auto-injection. You can now re-enable browser monitoring with a single `pantheon.yml` setting, and Pantheon's platform will handle the injection automatically. Changes take effect within a few minutes.

WordPress sites and Drupal versions prior to 10.2 are unaffected. Browser Agent auto-instrumentation continues to work out of the box for those frameworks. 

For full details, visit [our documentation page on New Relic](/guides/new-relic/troubleshoot-new-relic#enable-browser-monitoring-for-drupal-102).
