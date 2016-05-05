---
title: Drupal 8 on Pantheon
categories: [drupal]
tags: [drupal-8, code]
---

[Drupal 8](https://www.drupal.org/drupal-8.0) is now available on Pantheon! New Drupal 8 sites will use the [drops-8](https://github.com/pantheon-systems/drops-8) upstream repository and can be created via [Terminus](/docs/terminus) or the [Dashboard](https://dashboard.pantheon.io/products/drupal8/spinup). To bring an existing Drupal 8 site onto Pantheon, see [Migrate to Pantheon: Manual Site Import](/docs/manual-import). However, things may break and our support is limited at this time.

## Docs Progress
Planned and in-progress work for Drupal 8 documentation on Pantheon can be tracked in our <a href="https://github.com/pantheon-systems/documentation/issues?q=is%3Aopen+is%3Aissue+milestone%3AD8">D8 Milestone</a>. Pull requests are always welcome.

## Known Issues

### Installation Requires SFTP Mode
Drupal 8 currently requires that the `settings.php` file be writeable in order to complete the installation. This means that if you switch from SFTP to Git mode in your Dashboard before completing the installation, the installation will fail. The workaround is to simply leave your site in SFTP mode until you have completed the installation and committed the `settings.php` file. You can [follow the issue on drupal.org](https://www.drupal.org/node/2156401).

### Unavailable Features
The following platform features are not yet available on Pantheon for sites running Drupal 8:

 - [Solr](/docs/solr)
 - [Redis](/docs/redis/#drupal-8-sites)
 - The [Status tool's](/docs/drupal-launch-check) [Site Audit](https://www.drupal.org/project/site_audit) functionality
 - [BigPipe]

For more details on Pantheon's platform support for Drupal 8, follow the [Pantheon D8 issue on GitHub](https://github.com/pantheon-systems/drops-8/issues?q=is%3Aopen).
### Trusted Host Setting
A warning within `/admin/reports/status` will appear when the `trusted_host_patterns` setting is not configured. This setting protects sites from HTTP Host header attacks. However, sites running on Pantheon are not vulnerable to this specific attack and the warning can be safely ignored. For more details, see [Configuring settings.php](/docs/settings-php/#trusted-host-setting).
## Additional Resources

[Applying Upstream Updates](/docs/upstream-updates)  
[Drupal Drush Command-Line Utility](/docs/drush)  
[Major Version Drupal Upgrades](/docs/drupal-updates#upgrade-to-drupal-8)  
[Migrate to Pantheon: Manual Site Import](/docs/manual-import)  
