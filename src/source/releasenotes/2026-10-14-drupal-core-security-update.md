---
title: Drupal core critical security update (CVE-2026-108097)
published_date: "2026-10-14"
categories: [drupal, security, action-required]
description: "Update Drupal core to 11.4.10, 11.3.19, or 10.6.19 to fix a critical remote code execution vulnerability in the Field UI module (SA-CORE-2026-014)."
---

Drupal core security release [SA-CORE-2026-014](https://www.drupal.org/sa-core-2026-014) (CVE-2026-108097, risk 19/25) is now available. It fixes a critical remote code execution vulnerability in the Field UI module. Drupal core alone is not directly exploitable, but several exploit paths exist through contributed modules, and at least one does not require authentication. Custom code can also expose the vulnerable functionality.

## Action required

Update your Drupal sites to a patched release as soon as possible.

- Drupal 11.4.10
- Drupal 11.3.19
- Drupal 10.6.19

Drupal 12.0.0-alpha1 through 12.0.0-beta1 are also affected. See the [security advisory](https://www.drupal.org/sa-core-2026-014) for Drupal 12 fix details.

Drupal 11.2.x and earlier, Drupal 10.5.x and earlier, Drupal 9, and Drupal 8.9 are end-of-life. They are affected and do not receive a patch. Upgrade these sites to a supported release.

To apply the update, use [one-click core updates in the Pantheon dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

## Mitigation until you update

If you cannot update right away, uninstall the core Field UI module (`field_ui`). The Drupal Security Team states this protects your site until you update.

As a founding Platform Partner of the [Drupal Steward program](https://www.drupal.org/drupal-steward), Pantheon provides protection against some known attack vectors. Steward does not cover all possible exploits, so update your site.
