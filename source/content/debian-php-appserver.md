---
title: Debian PHP Appserver Upgrade (Beta)
description: Adopting the new PHP appserver operating system.
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

In May 2025, Pantheon introduced a new PHP application server based on the Debian operating system, which will replace our previous CentOS-based infrastructure. This upgrade represents our commitment to providing a modern, secure, and efficient hosting environment for your applications.

Depending on your web application's configuration, this change may have major effects on the compatibility of your site. During the beta phase, we invite you to test your site for compatibility and performance to ensure a seamless upgrade.

## Why Switch?

- Enhanced security features with a hardened operating system image
- Long Term Support (LTS) coverage for EOL PHP versions
- Better compatibility with updated PHP extensions

## Opt-In Beta Phase (Q2 2025)

During the beta phase, you can opt in to test your sites on the new Debian-based infrastructure. The opt-in is environment-based, meaning you can trial Debian with a clone of your sites without any harm to your live environments. This allows you to:

- Verify your site's compatibility before the platform-wide rollout
- Test your deployment workflows
- Identify any potential issues early
- Provide valuable feedback to our team

### How to Opt In

To enable the Debian operating system for an environment, add the following to your `pantheon.yml`:

```yaml:title=pantheon.yml
appserver_os: debian12
```

To safely revert to the CentOS operating system, you may remove the line during the beta phase or use:

```yaml:title=pantheon.yml
appserver_os: centos
```

Since any `pantheon.yml` changes are part of your site repository and promoted if you push to test or live, we recommend using a multidev or removing the `appserver_os` parameter before promoting any code while you are testing compatibility.

## Timeline

| Phase | Date | Details |
|-----------|------------------|--------------|
| **Beta (Opt-in)** | April - July 2025 | Sites can be opted-in to Debian. All other sites will continue using CentOS |
| **Rollout (Opt-out)** | August-September 2025 | A slow rollout will auto-upgrade all sites to Debian. Opting out via the `pantheon.yml` parameter will be available |
| **CentOS Deprecation** | Q1 2026 | CentOS will no longer be a valid `appserver_os` option, and all remaining sites will be auto-upgraded to Debian |


## Known Changes and Differences

### OS Packages

| Package | CentOS | Debian |
|---------|---------|---------|
| **OIC (Oracle Instant Client)** | Available for PHP 7.4-8.3 | Available for PHP 8.2-8.4 |
| **IBM PHP ODBC Driver** | Available for PHP 7.4-8.2 | Not available |
| **wkhtmltopdf** | 0.12.5 available | Not available |
| **Apache Tika** | 1.18, v1.21 available | Not available <sup>1</sup> |
| **PhantomJS** | 1.7.0, 2.1.1 available | Not available |

<sup>1</sup> For `search_api_attachments` users, we recommend using the Solr Extractor built into the `Pantheon Search` Solr server, rather than using Tika on the appserver. This is configured at `/admin/config/search/search_api_attachments`. 

### PHP Extensions

| Extension | CentOS | Debian |
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

Does your application require an OS package or PHP extension that is no longer available? Please reach out to us to discuss compatibility by [filling this form](https://docs.google.com/forms/d/e/1FAIpQLSfbgXOPRq4ylGgtGLHsQ68dwc_11eUzO7Y2X6PjIB3oy9rUxA/viewform?usp=header) or contacting your Customer Success Manager.

## Known Issues

- SFTP mode is currently non-functional. Git mode is available.
- New Relic is currently unavailable for sites using Debian.

## Reporting Issues

If you encounter any issues while testing your site on the new Debian infrastructure:

1. Check the Known Issues section above
2. Verify the issue is related to the new infrastructure by reverting back to `centos`.
3. Submit a detailed report through our [Support Portal](https://pantheon.io/support). Include "Debian Beta" in your message to support.

## Frequently Asked Questions

### Q: Will I need to make changes to my application?

Potentially. Depending on your integrations with our PHP extensions and operating system libraries, you may need to update your application to be compatible with Debian 12.

### Q: Can I switch back to CentOS if I encounter issues?

Yes, you may revert back to CentOS prior to the CentOS deprecation by setting the following in your `pantheon.yml`:

```yaml:title=pantheon.yml
appserver_os: centos
```