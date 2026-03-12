---
title: "PHP version removal schedule announced"
published_date: "2026-03-11"
published_at: "2026-03-12T19:40:58Z"
categories: [infrastructure, security, action-required]
---
Pantheon is announcing a PHP version removal schedule. The following PHP versions will be removed from the platform on **September 30, 2026**:

- PHP 5.6
- PHP 7.0
- PHP 7.1
- PHP 7.2 (End of Sale: May 1, 2026)
- PHP 7.3 (End of Sale: May 1, 2026)
- PHP 8.0 (End of Sale: May 1, 2026)

PHP 5.6, 7.0, and 7.1 are already end-of-sale. PHP 7.2, 7.3, and 8.0 will reach end-of-sale on **May 1, 2026**, meaning no new sites can be created with these versions after that date.

Additionally, PHP 8.1 will reach end-of-sale on **September 30, 2026**, with a removal date to be announced at least 9 months in advance.

**What happens when a PHP version is removed?**

Sites still running a removed PHP version will be automatically upgraded to the oldest available PHP version at the time of removal. If your site's software has not been updated for compatibility, this may result in broken functionality.

**What to expect going forward**

Pantheon will guarantee at least **9 months of advance notice** before removing any PHP version from the platform. Refer to the [PHP version lifecycle table](/guides/php#supported-php-versions) for the latest schedule.

**Action required**

If your site is running PHP 5.6, 7.0, 7.1, 7.2, 7.3, or 8.0, upgrade to a [recommended PHP version](/guides/php#supported-php-versions) before September 30, 2026 to avoid disruption. We recommend PHP 8.3 or 8.4 for all production sites.

For guidance on upgrading, refer to [Upgrade PHP Versions](/guides/php/php-versions).
