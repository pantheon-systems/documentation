---
title: Drupal core highly critical security update (CVE-2026-9082)
published_date: "2026-05-20"
categories: [drupal, security, action-required]
---

Drupal has released a highly critical security update (CVSS 20/25) for Drupal core addressing [SA-CORE-2026-004](https://www.drupal.org/sa-core-2026-004) (CVE-2026-9082). The vulnerability is a SQL injection flaw in Drupal's database abstraction API that only affects sites running on PostgreSQL. Drupal 7 is not affected.

**No action is required to protect your Pantheon-hosted sites.** Pantheon does not use PostgreSQL, so this vulnerability does not apply to sites hosted on Pantheon. Additionally, as a founding Platform Partner of the [Drupal Steward program](https://www.drupal.org/drupal-steward), Pantheon worked with the Drupal Security Team to implement platform-level mitigations prior to public disclosure.

### Recommended update

We still recommend updating to the latest Drupal core patch release to keep your codebase aligned with upstream supported branches.

Patched releases for supported branches:

- Drupal 11.3.10 and 11.2.12
- Drupal 10.6.9 and 10.5.10

Emergency patches are also available for end-of-life branches 11.1.x, 10.4.x, 9.5.x, and 8.9.x — see the [security advisory](https://www.drupal.org/sa-core-2026-004) for details.

To apply the update, use [one-click core updates in the Pantheon dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).
