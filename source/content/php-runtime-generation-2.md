---
title: PHP Runtime Generation 2
description: The second generation of Pantheon's PHP runtime with added security and updated extensions.
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

The new generation of Pantheon's serverless PHP runtime represents our commitment to providing a modern, secure, and efficient PHP runtime for your websites.

Depending on your website's features, this new PHP runtime may have major effects on the operation of your site. We invite you to test your site for compatibility and performance to ensure a seamless upgrade. The previous generation will be removed in early 2026.

## What's included?

- Long Term Support (LTS) coverage for EOL PHP versions (PHP 5.6+)
- Better CMS functionality via updated PHP extensions
- PHP 8.4 availability

## How to upgrade

To enable the second generation PHP runtime for an environment, add the following to your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 2
```

To safely revert to the previous generation, use the following:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```

Since any `pantheon.yml` changes are part of your site repository and promoted if you push to test or live, we recommend using a multidev or removing the `php_runtime_generation` parameter before promoting any code while you are testing compatibility.

## Timeline

| Phase | Date | Details |
|-----------|------------------|--------------|
| **Beta** | May - September 16, 2025 | Environments can be opted-in. All other environments will remain on the previous generation. |
| **New Sites** | September 17, 2025 | New sites created on the platform will use PHP Runtime Generation 2. |
| **Gen 2 Rollout** | September 24 - November 23, 2025 | A 60-day rollout will gradually upgrade sites to PHP Runtime Generation 2. [Sites may be opted-out](#q-how-do-i-opt-out-of-the-upcoming-platform-rollout). |
| **Gen 1 Removal** | Early 2026 | PHP Runtime Generation 1 will no longer be available. All remaining sites will be auto-upgraded. |

### Current Phase Details 
Currently, we are in the **Gen 2 Rollout** phase. The upgrade rollout will take place over the next 60 days. The table below shows which upgrades are being processed. [Sites may be opted-out](#q-how-do-i-opt-out-of-the-upcoming-platform-rollout). We will revise this section of documentation as we begin each phase along with any updates to the timeline. 

<Alert type="info" title="Deploying code will upgrade test/live environments">

Once the Dev environment for a site has been upgraded to Generation 2, deploying commits from Dev to Test will automatically upgrade the Test environment to Generation 2 as well. Following this pattern, an upgrade to the Live environment takes place once commits are deployed from the Test to Live environment.

</Alert>


| Start Date for Upgrades | Site Plans | Environments |
|-----------|------------------|--------------|
| September 24 | Sandbox | Dev/Multidevs |
| October 14 | Sandbox | Test/Live |
| October 16 | Basic | Dev/Multidevs |


## Known Changes and Requirements

### OS Packages

| Package | Gen 1 | Gen 2 |
|---------|---------|---------|
| **IBM PHP ODBC Driver** | Available for PHP 7.4-8.2 | Coming soon <sup>1</sup> |
| **wkhtmltopdf** | Available | Not available - [switch to dompdf](/external-libraries#wkhtmltopdf-deprecated) |
| **Apache Tika** | 1.18, 1.21 | 1.18, 1.21, [3.2](/external-libraries#apache-tika) |
| **PhantomJS** | 1.7.0, 2.1.1 available | Not available |

<sup>1</sup> Support for this OS Package will be added after the platform-wide rollout begins. If you depend on this OS Package, we recommend you <a href="#q-how-do-i-opt-out-of-the-upcoming-platform-rollout">opt out of Runtime Generation 2</a> for now. <br /><br />

### PHP Extensions

| Extension | Gen 1 | Gen 2 |
|-----------|---------|---------|
| **ioncube** | Available for PHP 7.1 only | Not available <sup>1</sup>  |
| **pdo_sqlsrv** | Available for PHP 7.2 only<br/>5.2.0 | Not available <sup>1</sup>  |
| **curl** | v7.61.1 | 7.88.1 |
| **gd** | 2.1.0 | 2.3.3 |
| **iconv** | 2.28 | 2.36 |
| **mongodb** | 1.14 | 2.1.1 |
| **openssl** | 1.1.1k | 3.0.17 |
| **pdo_pgsql** | 13.5 | 15.13 |
| **pdo_sqlite** | 3.26.0 | 3.40.1 |
| **pgsql** | 13.5 | 15.13 |
| **redis** | 5.3.7<br/>Compression types: zstd | 6.2.0<br/>Compression types: zstd, lzf, lz4 |
| **sqlite3** | 3.26.0 | 3.40.1 |

<sup>1</sup> Support for these PHP extensions may be added after the platform-wide rollout begins. If you depend on this PHP Extension, we recommend you <a href="#q-how-do-i-opt-out-of-the-upcoming-platform-rollout">opt out of PHP Runtime Generation 2</a> for now. <br /><br />

Does your application require an OS package or PHP extension that is no longer available? Please reach out to us to discuss compatibility by contacting your Customer Success Manager or creating a support ticket.

### Networking

| Protocol | Gen 1 | Gen 2 |
|---------|---------|---------|
| **TLS** | 1.0-1.3 | 1.2-1.3 <sup>1</sup>|

<sup>1</sup> Review the <a href="/tls-compatibility">TLS documentation</a> to check which version of TLS your external connections are using, and how to ensure you are compatible with this change.<br /><br />

## Known Issues

- Drupal 8+ sites using Solr 3 are not compatible with PHP Runtime Generation 2.  [Upgrading to Solr 8](https://docs.pantheon.io/release-notes/2025/08/solr-3-drupal-94-eol) or disabling Solr is required. These sites will not be included in the initial automatic upgrade rollout, but will be upgraded after November 12, 2025.

## Reporting Issues

If you encounter any issues while testing your site with PHP Runtime Generation 2:

1. Check the Known Issues section above
2. Verify the issue is related to the new PHP runtime by reverting back to `1` in your `pantheon.yml` file.
3. Submit a detailed report through our [Support Portal](https://pantheon.io/support). Include "PHP Runtime Generation 2" in your message to support.

## Frequently Asked Questions

### Q: How can I determine which PHP runtime a site environment is using?

The PHP runtime is set at the environment-level. You can find out which generation an environment is using via the [Terminus](/terminus) command  `terminus env:info <site>.<env>`.

### Q: Will I need to make changes to my website?

Potentially. Depending on your integrations with our PHP extensions and operating system libraries, you may need to update your website to be compatible with new PHP runtime.


### Q: How do I opt out of the upcoming platform rollout?

You may opt-out of the upcoming platform rollout by setting the following in your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```

Note: All sites will be auto-upgraded in early 2026 if they haven't already, including sites that specify the opt-out above.

### Q: Can I switch back to the previous PHP runtime if I encounter issues?

Yes, you may revert back to the first generation PHP runtime by setting the following in your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```

### Q: After upgrading to PHP Runtime Generation 2, I removed php_runtime_generation from my pantheon.yml but the environment did not go back to Generation 1. How do I downgrade?

To revert back to the first generation PHP runtime, set the following in your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```
