---
title: "PHP 8.2, 8.3, 8.4 and 8.5 updated to their latest security patch releases"
published_date: "2026-09-25"
published_at: "2026-09-25T14:40:53Z"
categories: [infrastructure, security]
description: "PHP versions 8.2.34, 8.3.35, 8.4.26, and 8.5.11 are now available on the platform."
---
PHP versions [8.2.34](https://www.php.net/ChangeLog-8.php#8.2.34), [8.3.35](https://www.php.net/ChangeLog-8.php#8.3.35), [8.4.26](https://www.php.net/ChangeLog-8.php#8.4.26), and [8.5.11](https://www.php.net/ChangeLog-8.php#8.5.11) are now available on the platform. These updates include important security fixes, along with bug fixes and enhancements that improve performance and stability.

The security fixes include a high-severity issue in the SOAP extension ([CVE-2026-91765](https://github.com/php/php-src/security/advisories/GHSA-rgrp-mwpx-f6rm)), plus fixes in OpenSSL certificate verification, the HTTP stream wrapper, and PHP-FPM.

Updates will be applied automatically over the next few days, so no manual action is required. See [PHP versions on Pantheon](/guides/php/php-versions) to check or change your site's PHP version.
