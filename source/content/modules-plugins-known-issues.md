---
title: Modules and Plugins with Known Issues
description: A list of Drupal modules and WordPress plugins that are not supported and/or require workarounds.
tags: [debugcode, siteintegrations]
categories: [troubleshoot, integrate]
contributors: [alexfornuto]
reviewed: "2020-01-08"
---

Pantheon is a high-performance [WebOps](/pantheon-workflow/) platform. Not all modules and plugins are optimized to work on such a platform. Many are built around the traditional LAMP or LEMP stack architecture.

These pages lists modules and plugins that may not function as expected or are currently problematic on the Pantheon platform:

- [Drupal Modules with Known Issues](/modules-known-issues/)
- [WordPress Plugins and Themes with Known Issues](/plugins-known-issues/)

Other considerations when working with third-party code are listed below.

## PHP Libraries

Due to the cloud-based infrastructure of the Pantheon platform, certain PHP libraries are not available on the platform. See [External Libraries on Pantheon](/external-libraries) for all libraries available.

### MSSQL

The MSSQL PHP library used to interface with Microsoft SQL Server databases is not supported on Pantheon for PHP versions below 7.2. See [Upgrade PHP Versions](/php-versions/) to set your PHP version. Please note that Pantheon does not offer MSSQL databases, this library is only available for those connecting to external databases.

## Dynamic Outbound IPs

Due to the cloud-based infrastructure of the Pantheon platform, outbound requests are served by dynamic IP addresses. If your site relies on a static IP address for outgoing requests, the recommended solution is [Secure Integration](/secure-integration/). This is the only way to guarantee compatibility with extensions or services that require a known outgoing IP. Otherwise, you will need to find an alternative to accomplish the request. For more information, see [Dynamic Outgoing IP Addresses](/outgoing-ips).

<Partial file="tmp-directory.md" />
