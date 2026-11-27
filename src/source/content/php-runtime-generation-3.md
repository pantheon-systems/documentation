---
title: PHP Runtime Generation 3
description: The third generation of Pantheon's PHP runtime runs on Debian 13 with updated system libraries and longer security support.
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

PHP Runtime Generation 3 runs your site's PHP on Debian 13, the current Debian release. It replaces [Generation 2](/php-runtime-generation-2) (Debian 12) as the operating system under every Pantheon PHP site.

PHP versions and PHP extension versions are the same as Generation 2. The changes are in the operating system and its system libraries.

## Why We Are Upgrading

Debian 12 reached the end of its regular support on July 11, 2026. It no longer receives point releases or updates from the Debian Security Team, only limited [Long Term Support (LTS)](https://wiki.debian.org/LTS) until June 30, 2028. Debian 13 is the current Debian release.

| | Debian 12 (Generation 2) | Debian 13 (Generation 3) |
|---|---|---|
| **Regular security updates and point releases** | Ended July 11, 2026 | Until August 9, 2028 |
| **Long Term Support (LTS)** | Until June 30, 2028 | Until June 30, 2030 |

Generation 3 also brings:

- Newer system libraries, including OpenSSL 3.5, curl 8.14 and ICU 76.
- The same PHP versions (5.6 to 8.5) with Long Term Support (LTS) coverage for end-of-life versions.

## Rollout Timeline

| Phase | Date | Details |
|-------|------|---------|
| **Opt-in** | Available now | Environments can be [opted in](#try-generation-3). All other environments remain on Generation 2. |
| **New Sites** | January 2027 | New sites created on the platform use Generation 3. |
| **Rollout** | March 2027 | Existing sites are gradually upgraded to Generation 3, completing by March 31, 2027. There is no opt-out. |

After the rollout, Generation 3 is the default for all sites.

## Try Generation 3

Add the following to your site's `pantheon.yml`, commit it to Dev or a Multidev environment and test your site:

```yaml:title=pantheon.yml
php_runtime_generation: 3
```

Once you have confirmed your site works, deploy to Test and Live. Generation 3 is safe to use on Live.

Until the March 2027 rollout, you can return to Generation 2 by removing the line. See [PHP Runtime Generations](/php-runtime-generation) for how the setting works.

## Known Changes and Requirements

### Not Available on Generation 3

| Item | Generation 2 | Generation 3 |
|------|--------------|--------------|
| **oauth extension** | Available for all PHP versions | Not available for PHP 5.6 and 7.0 |
| **Solr 3 with Drupal 8+** | Not supported | Not supported. Upgrade to [Solr 8](/guides/pantheon-search/solr-drupal/solr-drupal) before opting in; `pantheon.yml` is rejected otherwise. |

### OS Packages and Libraries

| Package | Generation 2 | Generation 3 | Who may notice |
|---------|--------------|--------------|----------------|
| **OpenSSL** | 3.0 | 3.5 | Sites calling very old HTTPS servers. TLS versions are unchanged (1.2-1.3). |
| **curl** | 7.88 | 8.14 | Sites using NTLM through `ntlm_wb` (removed) or unusual `NO_PROXY` values (parsed more strictly). |
| **ICU** (intl extension) | 72 | 76 | Code that sorts text with PHP's `Collator` may see a different order. |
| **OpenSSH** (SFTP and Git from PHP) | 9.2 | 10.0 | Connections using DSA keys or very old SFTP servers are rejected. |
| **ImageMagick** (PHP 8.4, 8.5) | 7.1.2 | 7.1.1 | Some rarely used image formats differ. |
| **Ghostscript** | 10.08 | 10.05.1, with the same security fixes | — |
| **tidy** | 5.6 | 5.8 | Sites that run the `tidy` command. |
| **Java** | 17 | 21 | Sites that run Java tools in the container. |

File paths are unchanged. Paths such as `/opt/pantheon/imagemagick/bin` and `/usr/local/bin/gs` continue to work.

## Frequently Asked Questions

### Q: How can I determine which PHP runtime a site environment is using?

See [Check an Environment's Generation](/php-runtime-generation#check-an-environments-generation).

### Q: Will I need to make changes to my website?

Most sites need no changes. Review the [Known Changes](#known-changes-and-requirements) and test your site on Dev or a Multidev environment with Generation 3 before the rollout reaches it.

### Q: Can my site be excluded from the rollout?

No. All sites are upgraded to Generation 3 by March 31, 2027, and the rollout has no exclusions. Test your site on Generation 3 before March 2027 and [contact support](/guides/support/contact-support) if you find an issue.

## Reporting Issues

[Contact support](/guides/support/contact-support) if you encounter any issues with PHP Runtime Generation 3. Provide a detailed report and include "PHP Runtime Generation 3" in your message.
