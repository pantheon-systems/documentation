---
title: "PHP 8.2, 8.3, 8.4 and 8.5 updated to their latest security patch releases"
published_date: "2026-11-20"
published_at: "2026-11-20T00:00:00Z"
categories: [infrastructure, security]
description: "PHP versions 8.2.36, 8.3.37, 8.4.28, and 8.5.13 now run on the platform, with fixes for 17 security issues."
---
PHP versions [8.2.36](https://www.php.net/ChangeLog-8.php#8.2.36), [8.3.37](https://www.php.net/ChangeLog-8.php#8.3.37), [8.4.28](https://www.php.net/ChangeLog-8.php#8.4.28), and [8.5.13](https://www.php.net/ChangeLog-8.php#8.5.13) now run on the platform. These releases fix 17 security issues, seven of them rated critical, along with bug fixes that improve stability.

The critical fixes include:

- Request smuggling in PHP-FPM through an unread HTTP request body ([CVE-2026-129289](https://github.com/php/php-src/security/advisories/GHSA-qc49-hpvq-g2w6))
- Remote code execution through a session serializer mismatch ([CVE-2026-115560](https://github.com/php/php-src/security/advisories/GHSA-658j-r8rw-q6mx)) and through partially overwritten session files ([CVE-2026-126714](https://github.com/php/php-src/security/advisories/GHSA-fm2m-fjf5-v3cp))
- Use-after-free issues that can lead to remote code execution in the timezone cache ([CVE-2026-129496](https://github.com/php/php-src/security/advisories/GHSA-gr4f-wgx5-jpfv)), magic method backtraces ([CVE-2026-129474](https://github.com/php/php-src/security/advisories/GHSA-8mjj-2r7p-4hg2)), fatal error backtraces after shutdown ([CVE-2026-129182](https://github.com/php/php-src/security/advisories/GHSA-2fjv-p558-g82m)), and interrupted session shutdown ([CVE-2026-129481](https://github.com/php/php-src/security/advisories/GHSA-g3vh-838c-65v7))

The remaining fixes cover the PHAR, SOAP, DOM, and URI extensions, the HTTP and FTP stream wrappers, PHP-CGI, and PHP-FPM.

Pantheon applies these updates automatically, so you don't need to take any action. See [PHP versions on Pantheon](/guides/php/php-versions) to check or change your site's PHP version.
