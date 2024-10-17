---
title: Resolved Bug Affecting Form Email Content
published_date: "2024-10-17"
categories: [infrastructure]
---

Some customers have reported that emails from form plugins like Gravity Forms or Contact Form 7 have content truncated after upgrading from PHP 7.4 to PHP 8. A fix has been applied to PHP 8.2+. Affected sites can resolve by [upgrading their PHP version](/guides/php/php-versions) to 8.2 or 8.3.

As a reminder, PHP 8.0 reached End-of-Life and PHP 8.1 was moved to security-only updates on 26 November 2023. PHP 8.1 will reach End-of-Life in December 2025. For the best performance and security, Pantheon recommends running PHP 8.2 and above.
