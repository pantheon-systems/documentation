---
title: "PHP Runtime Generation 1 Removal: Timeline for Environment Upgrades"
published_date: "2026-02-11"
categories: [infrastructure, action-required]
---

As a follow-up to our release note announcing the [removal of PHP Runtime Generation 1](/releasenotes/2025-12-09-php-runtime-generation-1-removal-date), we're now providing specific dates for the removal from the platform.

## What's changing when?

All environments that have not been upgraded to [PHP Runtime Generation 2](/php-runtime-generation-2) will be auto-upgraded on the following schedule:

- **April 6, 2026**: Dev and Multidev environments will be auto-upgraded to Generation 2
- **April 13, 2026**: Test and Live environments will be auto-upgraded to Generation 2

After these dates, PHP Runtime Generation 1 will no longer be available.

## Action Required

We strongly recommend that all site owners proactively test and upgrade to Generation 2 rather than waiting for the auto-upgrade. This allows you to:

- Test your site in Dev and Multidev environments before the upgrade reaches Test and Live
- Address any compatibility issues on your own timeline
- Avoid potential downtime or unexpected issues during the auto-upgrade

Please review the [Known Changes and Requirements](/php-runtime-generation-2#known-changes-and-requirements) if you are still in the process of upgrading your site.
