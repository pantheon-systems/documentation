---
title: PHP Runtime Generation 2
description: The second generation of Pantheon's PHP runtime provides added security and updated extensions.
tags: [updates, libraries]
contenttype: [doc]
innav: [true]
categories: [php]
cms: [drupal, wordpress]
audience: [development]
product: [--]
integration: [--]
---

## Overview

The latest generation of Pantheon's serverless PHP runtime represents our commitment to providing a modern, secure, and efficient PHP runtime for your websites.

The previous generation was removed in April 2026.

## What's included?

- Long Term Support (LTS) coverage for EOL PHP versions (PHP 5.6+)
- Better CMS functionality via updated PHP extensions
- PHP 8.4 and 8.5 availability


## Rollout Timeline

| Phase | Date | Details |
|-----------|------------------|--------------|
| **Beta** | May - September 16, 2025 | Environments could be opted-in. All other environments remained on the previous generation. |
| **New Sites** | September 17, 2025 | New sites created on the platform use PHP Runtime Generation 2. |
| **Gen 2 Rollout** | September 24 - November 20, 2025 | A 60-day rollout gradually upgraded sites to PHP Runtime Generation 2. An opt-out is available. |
| **Gen 1 Removal** | April 6 - 17, 2026  | PHP Runtime Generation 1 is no longer be available. All remaining sites are auto-upgraded. |

### Current Phase Details 

We are currently upgrading any opted-out sites to PHP Runtime Generation 2.

| Start Date for Auto-Upgrades | Site Plans | Environments |
|-----------|------------------|--------------|
| April 6, 2026 | All Plans | Dev/Multidevs |
| April 13, 2026 | All Plans | Test/Live |

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>


## Known Changes and Requirements

### OS Packages

| Package | Gen 1 | Gen 2 |
|---------|---------|---------|
| **IBM PHP ODBC Driver** | Available for PHP 7.4-8.2 | Available |
| **Microsoft ODBC Driver 17 and 18 for SQL Server** | — | Available for PHP 8.2+ |
| **wkhtmltopdf** | Available | Not available - [switch to dompdf](/external-libraries#wkhtmltopdf-deprecated) |
| **Apache Tika** | 1.18, 1.21 | [3.2](/external-libraries#apache-tika) |
| **PhantomJS** | 1.7.0, 2.1.1 available | Not available |


### PHP Extensions

| Extension | Gen 1 | Gen 2 |
|-----------|---------|---------|
| **ioncube** | Available for PHP 7.1 only | Not available  |
| **sqlsrv** | Available for PHP 7.2 only | Available for PHP 8.3+<br/>5.13.0 |
| **pdo_sqlsrv** | Available for PHP 7.2 only<br/>5.2.0 | Available for PHP 8.3+<br/>5.13.0 |
| **curl** | v7.61.1 | 7.88.1 |
| **gd** | 2.1.0 | 2.3.3 |
| **iconv** | 2.28 | 2.36 |
| **mongodb** | 1.14 | 2.1.1 |
| **openssl** | 1.1.1k | 3.0.17 |
| **pdo_pgsql** | 13.5 | 15.14 |
| **pdo_sqlite** | 3.26.0 | 3.40.1 |
| **pgsql** | 13.5 | 15.14 |
| **redis** | 5.3.7<br/>Compression types: zstd | 6.3.0<br/>Compression types: zstd, lzf, lz4 |
| **sqlite3** | 3.26.0 | 3.40.1 |

### Networking

| Protocol | Gen 1 | Gen 2 |
|---------|---------|---------|
| **TLS** | 1.0-1.3 | 1.2-1.3 <sup>1</sup>|

<sup>1</sup> Review the <a href="/tls-compatibility">TLS documentation</a> to check which version of TLS your external connections are using, and how to ensure you are compatible with TLS 1.2+.<br /><br />

## Reporting Issues

[Contact support](/guides/support/contact-support) if you encounter any issues with PHP Runtime Generation 2. Provide a detailed report and include "PHP Runtime Generation 2" in your message.

## Frequently Asked Questions

### Q: How can I determine which PHP runtime a site environment is using?

The PHP runtime is set at the environment-level. You can find out which generation an environment with the following methods:

* Use the [Terminus](/terminus) command  `terminus env:info <site>.<env>`. This requires Terminus 4.0.2+
* Use the Terminus command `env:list <site> --fields=id,php_runtime_generation,php_version`. This requires Terminus 4.1.0+
* View your site on the Pantheon Dashboard, navigate to the environment's Status page, then review the Software Versions block


### Q: Can I be excluded from the removal of PHP Runtime Generation 1?

All sites on Generation 1 will be auto-upgraded to Generation 2 starting April 6, 2026, if they haven't already. The rollout will not have an exclusion policy for the auto-upgrades.
