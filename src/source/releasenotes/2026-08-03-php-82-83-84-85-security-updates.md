---
title: "PHP 8.2, 8.3, 8.4 and 8.5 updated to their latest security patch releases"
published_date: "2026-08-03"
categories: [infrastructure, security]
description: "PHP versions 8.2.33, 8.3.33, 8.4.24, and 8.5.9 are now available on the platform."
---
PHP versions [8.2.33](https://www.php.net/ChangeLog-8.php#8.2.33), [8.3.33](https://www.php.net/ChangeLog-8.php#8.3.33), [8.4.24](https://www.php.net/ChangeLog-8.php#8.4.24), and [8.5.9](https://www.php.net/ChangeLog-8.php#8.5.9) are now available on the platform. These releases address three security issues, along with bug fixes and enhancements that improve performance and stability.

If your site uses PHP's PostgreSQL extension (`ext-pgsql`) to connect to an external database, review [CVE-2026-17543](https://github.com/php/php-src/security/advisories/GHSA-7qpv-r5mr-78m4) closely. This high-severity flaw allows SQL injection through `pg_insert()`, `pg_update()`, `pg_select()`, and `pg_delete()` when those functions receive untrusted input, and it is exploitable under default PostgreSQL settings. Pantheon's own MySQL-based databases are unaffected.

The remaining fixes are an out-of-bounds write in BCMath's `bccomp()` ([CVE-2026-17544](https://github.com/php/php-src/security/advisories/GHSA-x692-q9x7-8c3f), affecting PHP 8.4 and 8.5) and a crash triggered by recursive symlinks in the Phar extension ([CVE-2026-7260](https://github.com/php/php-src/security/advisories/GHSA-vc5h-9ppw-p5f3)). PHP 8.5.9 and 8.4.24 also include an updated libgd ([CVE-2026-9672](https://www.php.net/ChangeLog-8.php#8.5.9)).

Updates will be applied automatically over the next few days, so no manual action is required.
