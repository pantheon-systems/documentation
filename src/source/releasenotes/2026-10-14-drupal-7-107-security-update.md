---
title: Drupal 7 LTS security update now available (Drupal 7.107)
published_date: "2026-10-14"
published_at: "2026-10-14T18:30:08Z"
categories: [drupal, action-required, security]
description: "Drupal 7.107 is now available with a backported fix for SA-CORE-2026-014, a critical remote code execution vulnerability in the Field UI module."
---

As part of [Pantheon's Long-Term Support (LTS) for Drupal 7](https://pantheon.io/drupal-7), Drupal 7.107 is now available with a backported security patch.

This release backports the fix for [SA-CORE-2026-014](https://www.drupal.org/sa-core-2026-014) (CVE-2026-108097), a critical remote code execution vulnerability in the Field UI module. Drupal core alone is not directly exploitable, but several exploit paths exist through contributed modules, and at least one does not require authentication.

## Action required

Apply the latest upstream update to your Drupal 7 site to receive this fix. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

This fix changes how Field UI overview tables assign rows to regions: Drupal core no longer calls the `#region_callback` function set on a table row. After you update, review whether any custom code uses `#region_callback`, and test the **Manage fields** and **Manage display** pages to confirm the Field UI tables work as expected.

## About Drupal 7 Long-Term Support

Pantheon has partnered with Tag1 Consulting to deliver security updates and maintenance for Drupal 7 sites. This extended support is included at no additional cost.

For configuration guidance and detailed information, visit our [related documentation](/supported-drupal/#drupal-7-long-term-support).
