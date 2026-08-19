---
title: Drupal 7 LTS security update now available (Drupal 7.106)
published_date: "2026-08-19"
published_at: "2026-08-19T00:00:00Z"
categories: [drupal, action-required, security]
---

As part of [Pantheon's Long-Term Support (LTS) for Drupal 7](https://pantheon.io/drupal-7), Drupal 7.106 is now available with a backported security patch.

This release backports the fix for [SA-CORE-2026-010](https://www.drupal.org/sa-core-2026-010), an information disclosure vulnerability in the Image module. Insufficient access verification for image style derivatives could expose access-restricted images when served through non-private file streams.

### Action required

Apply the latest upstream update to your Drupal 7 site to receive this fix. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

### About Drupal 7 Long-Term Support

Pantheon has partnered with Tag1 Consulting to deliver security updates and maintenance for Drupal 7 sites. This extended support is included at no additional cost.

For configuration guidance and detailed information, visit our [related documentation](/supported-drupal/#drupal-7-long-term-support).
