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

<Alert title="Warning" type="danger">
We currently recommend only using the PHP Runtime Generation 2 beta for testing with non-Live environments.
</Alert>

## Overview

A new generation of our Serverless PHP Runtime is available in beta. This upgrade represents our commitment to providing a modern, secure, and efficient PHP runtime for your websites.

Depending on your website's features, this change may have major effects on the compatibility of your site. During the beta phase, we invite you to test your site for compatibility and performance to ensure a seamless upgrade. The previous generation will be deprecated in 2026.

## Why Upgrade?

- Long Term Support (LTS) coverage for EOL PHP versions
- Better compatibility with updated PHP extensions
- Enhanced security infrastructure
- PHP 8.4 availability (coming soon)

## Opt-In Beta Phase (Q2 2025)

During the beta phase, you can opt in to test your sites on the new PHP runtime. The opt-in is environment-based, meaning you can trial the new PHP runtime without affecting your other environments. This allows you to:

- Verify your site's compatibility before the platform-wide rollout
- Test your deployment workflows
- Identify any potential issues early
- Provide valuable feedback to our team

### How to Opt In

To enable the second generation PHP runtime for an environment, add the following to your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 2
```

To safely revert to the previous generation, you may remove the line during the beta phase or use:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```

Since any `pantheon.yml` changes are part of your site repository and promoted if you push to test or live, we recommend using a multidev or removing the `php_runtime_generation` parameter before promoting any code while you are testing compatibility.

## Timeline

| Phase | Date | Details |
|-----------|------------------|--------------|
| **Beta (Opt-in)** | May - July 2025 | Environments can be opted-in. All other environments will remain on the previous generation |
| **Rollout (Opt-out)** | August-September 2025 | A slow rollout will auto-upgrade all sites to PHP Runtime Generation 2. Opting out via the `pantheon.yml` parameter will be available |
| **Gen 1 Deprecation** | Q1 2026 | PHP Runtime Generation 1 will no longer be available - all remaining sites will be auto-upgraded |


## Known Changes and Requirements

### OS Packages

| Package | Gen 1 | Gen 2 |
|---------|---------|---------|
| **OIC (Oracle Instant Client)** | Available for PHP 7.4-8.3 | Available for PHP 8.2-8.4 |
| **IBM PHP ODBC Driver** | Available for PHP 7.4-8.2 | Not available |
| **wkhtmltopdf** | 0.12.5 available | Not available <sup>1</sup> |
| **Apache Tika** | 1.18, v1.21 available | Coming soon |
| **PhantomJS** | 1.7.0, 2.1.1 available | Not available |

<sup>1</sup> wkhtmltopdf is no longer supported by its maintainers. We are working on integrating a different solution for customers depending on this OS Package. <br />

### PHP Extensions

| Extension | Gen 1 | Gen 2 |
|-----------|---------|---------|
| **oci8** | Available for PHP 7.4-8.3<br/>3.3.x | Available for PHP 8.2-8.4<br/>3.4.x |
| **ioncube** | Available for PHP 7.1 only | Not available |
| **pdo_sqlsrv** | Available for PHP 7.2 only<br/>5.2.0 | Not available |
| **curl** | v7.61.1 | 7.88.1 |
| **gd** | 2.1.0 | 2.3.3 |
| **iconv** | 2.28 | 2.36 |
| **mongodb** | 1.14 | 1.20 |
| **openssl** | 1.1.1k | 3.0.15 |
| **pdo_pgsql** | 13.5 | 15.12 |
| **pdo_sqlite** | 3.26.0 | 3.40.1 |
| **pgsql** | 13.5 | 15.12 |
| **redis** | 5.3.7<br/>Compression types: zstd | 6.1<br/>Compression types: zstd, lzf, lz4 |
| **sqlite3** | 3.26.0 | 3.40.1 |

Does your application require an OS package or PHP extension that is no longer available? Please reach out to us to discuss compatibility by contacting your Customer Success Manager or creating a support ticket.

### Networking

| Protocol | Gen 1 | Gen 2 |
|---------|---------|---------|
| **TLS** | 1.0-1.3 | 1.2-1.3 <sup>1</sup>|

<sup>1</sup> Review the <a href="/tls-compatibility">TLS documentation</a> to check which version of TLS your external connections are using, and how to ensure you are compatible with this change.<br /><br />

### Drupal 7/8 Minor Version Requirements

To provide the most secure environment, sites running Drupal 7 or 8 may need upgrading before switching to the new PHP runtime generation.

| Drupal Major Version | Minimum Required Version |
|---------|---------|---------|
| Drupal 7.x | 7.58+ |
| Drupal 8.x | 8.5.1+ |

## Known Issues

- SFTP mode is currently unsupported. Git mode is available. 
- Drupal 7 sites cannot access Solr services. An update to `drops-7` will be available soon.
- ClamAV is currently unavailable.

## Reporting Issues

If you encounter any issues while testing your site on the new PHP runtime generation:

1. Check the Known Issues section above
2. Verify the issue is related to the new infrastructure by reverting back to `1` in your `pantheon.yml` file.
3. Submit a detailed report through our [Support Portal](https://pantheon.io/support). Include "PHP Runtime Generation 2 Beta" in your message to support.

## Frequently Asked Questions

### Q: Will I need to make changes to my website?

Potentially. Depending on your integrations with our PHP extensions and operating system libraries, you may need to update your website to be compatible with new PHP runtime.

### Q: Can I switch back to the previous PHP runtime if I encounter issues?

Yes, you may revert back to the first generation PHP runtime by setting the following in your `pantheon.yml`:

```yaml:title=pantheon.yml
php_runtime_generation: 1
```