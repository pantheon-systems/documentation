---
title: Drupal 7 LTS security update now available (Drupal 7.108)
published_date: "2026-11-04"
published_at: "2026-11-04T20:53:44Z"
categories: [drupal, action-required, security]
description: "Drupal 7.108 is now available with two security fixes: restored cache hardening from SA-CORE-2024-008 and a fix for an access bypass in external authentication."
---

As part of [Pantheon's Long-Term Support (LTS) for Drupal 7](https://pantheon.io/drupal-7), Drupal 7.108 is now available with two security fixes.

- **Restored cache hardening:** This release restores the `DrupalCacheArray::__destruct()` hardening from [SA-CORE-2024-008](https://www.drupal.org/sa-core-2024-008) (CVE-2024-55638), which was lost in Drupal 7.103.
- **External authentication access bypass:** This release fixes an access bypass caused by case-insensitive matching of external authentication names. Drupal now accepts only an exact match for names stored in the `authmap` table, and refuses new external logins whose name differs from an existing account only by case or trailing spaces.

## Action required

Apply the latest upstream update to your Drupal 7 site to receive these fixes. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

After you apply the update, run database updates in each environment, either from `update.php` or with Terminus:

```bash{promptUser: user}
terminus drush $site.$env -- updatedb
```

This release includes the `user_update_7021()` database update, which makes the `authmap.authname` column case-sensitive on MySQL. The update stops without making changes if your `authmap` table contains names that differ only by case or trailing spaces. If that happens, merge or remove the duplicate entries, then run database updates again.

If your site uses an external authentication module, such as SAML, LDAP, or OpenID, and your identity provider treats names as case-insensitive, confirm that the provider sends names with consistent casing. Otherwise, affected users might see "Unable to log in. Contact the site administrator."

## About Drupal 7 long-term support

Pantheon has partnered with Tag1 Consulting to deliver security updates and maintenance for Drupal 7 sites. This extended support is included at no additional cost.

For configuration guidance and detailed information, visit our [related documentation](/supported-drupal/#drupal-7-long-term-support).
