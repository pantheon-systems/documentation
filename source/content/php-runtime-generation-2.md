---
title: PHP Runtime Generation 2 (Beta)
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

The new generation of our Serverless PHP runtime represents our commitment to providing a modern, secure, and efficient PHP runtime for your websites.

Depending on your website's features, this new PHP runtime may have major effects on the operation of your site. During the beta phase, we invite you to test your site for compatibility and performance to ensure a seamless upgrade. The previous generation will be removed in early 2026.

## What's included?

- Long Term Support (LTS) coverage for EOL PHP versions (PHP 5.6+)
- Better CMS functionality via updated PHP extensions
- PHP 8.4 availability

## Beta Phase (April - September 16, 2025)

During the beta phase, you can opt in to test your sites on the new PHP runtime. The opt-in is environment-based, meaning you can trial the new PHP runtime without affecting your other environments. This allows you to:

- Verify your site's compatibility before the platform-wide rollout
- Test your deployment workflows
- Identify any potential issues early
- Provide valuable feedback to our team

It is safe to use the PHP Runtime Generation 2 beta on a Live environment once you have confirmed site compatibility.

### How to Opt In

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
| **Gen 2 Rollout** | September 17 - October 27, 2025 | A 40-day rollout will gradually upgrade sites to PHP Runtime Generation 2. [Sites may be opted-out](#q-how-do-i-opt-out-of-the-upcoming-platform-rollout). |
| **Gen 1 Removal** | Early 2026 | PHP Runtime Generation 1 will no longer be available. All remaining sites will be auto-upgraded. |


## Known Changes and Requirements

### OS Packages

| Package | Gen 1 | Gen 2 |
|---------|---------|---------|
| **IBM PHP ODBC Driver** | Available for PHP 7.4-8.2 | Coming soon <sup>1</sup> |
| **ClamAV** | Available | Coming soon <sup>1</sup> |
| **wkhtmltopdf** | 0.12.5 available | Replacement coming soon <sup>2</sup> |
| **Apache Tika** | 1.18, 1.21 available | 1.18, 1.21, 3.2 coming soon <sup>3</sup> |
| **PhantomJS** | 1.7.0, 2.1.1 available | Not available |

<sup>1</sup> Support for this OS Package may be added after the platform-wide rollout begins. If you depend on this OS Package, we recommend you <a href="#q-how-do-i-opt-out-of-the-upcoming-platform-rollout">opt out of Runtime Generation 2</a> for now. <br /><br />
<sup>2</sup> wkhtmltopdf is no longer supported by its maintainers. We are working to offer a different solution for sites that use server-side PDF generation. <br /><br />
<sup>3</sup> Tika will be made available before the platform-wide rollout in September. <br /><br />


### PHP Extensions

| Extension | Gen 1 | Gen 2 |
|-----------|---------|---------|
| **ioncube** | Available for PHP 7.1 only | Not available <sup>1</sup>  |
| **pdo_sqlsrv** | Available for PHP 7.2 only<br/>5.2.0 | Not available <sup>1</sup>  |
| **curl** | v7.61.1 | 7.88.1 |
| **gd** | 2.1.0 | 2.3.3 |
| **iconv** | 2.28 | 2.36 |
| **mongodb** | 1.14 | 2.1.0|
| **openssl** | 1.1.1k | 3.0.16 |
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

- [Object Cache Pro installation via Terminus for standard WordPress configurations](/object-cache/wordpress#installation-and-configuration) is currently unavailable. 
  - Workaround: [Downgrade to PHP Runtime Generation 1](/php-runtime-generation-2#q-can-i-switch-back-to-the-previous-php-runtime-if-i-encounter-issues), follow the installation procedure, then upgrade back to PHP Runtime Generation 2.

## Reporting Issues

If you encounter any issues while testing your site with PHP Runtime Generation 2:

1. Check the Known Issues section above
2. Verify the issue is related to the new PHP runtime by reverting back to `1` in your `pantheon.yml` file.
3. Submit a detailed report through our [Support Portal](https://pantheon.io/support). Include "PHP Runtime Generation 2 Beta" in your message to support.

## Frequently Asked Questions

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
