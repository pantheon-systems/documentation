---
title: "PHP Runtime Generation 2 Beta Available; Platform Rollout Starting September 17"
published_date: "2025-08-11"
categories: [infrastructure, action-required]
---

[PHP Runtime Generation 2](https://docs.pantheon.io/php-runtime-generation-2) includes updated extensions, the latest PHP version, and enhanced security features. This new PHP runtime is currently available in beta and will begin rolling out on September 17. Early testing is recommended to ensure compatibility.

## What's New

- [Updated PHP extensions](/php-runtime-generation-2#php-extensions) for improved performance and compatibility
- LTS coverage for PHP 5.6+  
- [PHP 8.4](/release-notes/2025/07/php-84-now-available) availability
- Tika 3.2 availability (coming soon)

### What's Changing?

- wkhtmltopdf is no longer available - switch to dompdf
- PhantomJS is no longer available (the project was abandoned by its maintainers)
- TLS 1.2+ is required - [learn about TLS compatibility](/tls-compatibility#pantheon-platform-tls-compatibility)

## What's Currently Unavailable with Generation 2?

Some PHP extensions and OS packages have not been ported over to Generation 2 yet, and may never be ported. Review the [OS Packages and PHP Extensions documentation](https://docs.pantheon.io/php-runtime-generation-2#os-packages) to review these changes. If you depend on these, we recommend you [opt out of Runtime Generation 2](/php-runtime-generation-2#q-how-do-i-opt-out-of-the-upcoming-platform-rollout) for now, and contact your Customer Success Manager or create a support ticket to discuss your site needs.

## Action Recommended

We recommend all customers test your sites ahead of the rollout to identify any compatibility issues. Sites relying on unavailable extensions or packages should [opt out](/php-runtime-generation-2#q-how-do-i-opt-out-of-the-upcoming-platform-rollout) before September 17. We will attempt to auto-detect incompatible sites and delay their upgrade when possible.

## Rollout Timeline

We are currently in the beta phase, with a platform-wide rollout starting September 17. 

It is safe to use the PHP Runtime Generation 2 beta on a Live environment once you have confirmed site compatibility.

| Phase | Date | Details |
|-----------|------------------|--------------|
| **Beta** | May - September 16, 2025 | Environments can be opted-in. All other environments will remain on the previous generation. |
| **Gen 2 Rollout** | September 17 - October 27, 2025 | A 40-day rollout will gradually upgrade sites to PHP Runtime Generation 2. [Sites may be opted-out](#q-how-do-i-opt-out-of-the-upcoming-platform-rollout). |
| **Gen 1 Removal** | Early 2026 | PHP Runtime Generation 1 will no longer be available. All remaining sites will be auto-upgraded. |

