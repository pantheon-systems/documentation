---
title: "PHP 8.1 is now End of Sale"
published_date: "2026-09-30"
published_at: "2026-09-30T14:00:00Z"
categories: [infrastructure, action-required]
description: "PHP 8.1 has reached End of Sale on the Pantheon platform. Sites created after September 30, 2026 can no longer use PHP 8.1."
---
PHP 8.1 has reached **End of Sale** on the Pantheon platform. Sites created after September 30, 2026 can no longer set their PHP version to 8.1.

Sites already running PHP 8.1 continue to run. They keep receiving LTS security coverage through [PHP Runtime Generation 2](/php-runtime-generation-2), with no action required. A removal date for PHP 8.1 has not been set, and Pantheon guarantees at least 9 months of advance notice before removing any PHP version from the platform.

## Action required

If you maintain a custom upstream that sets `php_version: 8.1` in `pantheon.upstream.yml`, update it to a supported version. New sites created from that upstream may otherwise behave unexpectedly on creation.

If your site runs PHP 8.1, plan an upgrade to a [recommended PHP version](/guides/php#supported-php-versions). Pantheon recommends PHP 8.3 or 8.4 for all production sites. For steps, see [Upgrade PHP Versions](/guides/php/php-versions).
