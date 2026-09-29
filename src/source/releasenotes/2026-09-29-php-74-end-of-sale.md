---
title: "PHP 7.4 entering End-of-Sale December 31, 2026"
published_date: "2026-09-29"
categories: [infrastructure, deprecated, action-required]
---

Pantheon is announcing that, as of December 31, 2026, PHP version 7.4 will enter End of Sale. As a result, no new sites can be created with this version after that date.

## What happens to existing sites when a PHP version reaches End of Sale?

Existing sites running an end-of-sale PHP version will not be affected. Pantheon will continue to apply security patches for PHP 7.4 where available for the duration of End of Sale. 

## What to expect going forward

In the future, we expect to transition PHP 7.4 to End of Support status. When this happens, this version will no longer be supported by PHP maintainers, nor will Pantheon provide ongoing updates from our contracted vendors. Customers will assume additional security risk by staying on these versions. Pantheon commits to providing at least 90 days advance notice to customers before transitioning a version of PHP to End of Support.

## Action required

If your site is running PHP 7.4, we encourage you to upgrade it to a current PHP version. We recommend PHP 8.3 or 8.4 for all production sites.

For guidance on upgrading, refer to [Upgrade PHP Versions](/guides/php/php-versions).