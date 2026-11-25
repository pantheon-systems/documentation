---
title: Drupal core security release fixes a highly critical installer access bypass
published_date: "2026-11-25"
published_at: "2026-11-25T00:00:00Z"
categories: [drupal, action-required, security]
description: "Drupal 10.6.23, 11.3.23, and 11.4.14 fix a highly critical access bypass in the Drupal installer. Pantheon's edge protection already blocks the known attack path."
---

The Drupal Security Team released Drupal 10.6.23, 11.3.23, and 11.4.14 on November 25, 2026. These releases fix [SA-CORE-2026-019](https://www.drupal.org/sa-core-2026-019), a highly critical access bypass in the Drupal installer.

Pantheon's edge protection already blocks the known attack path, so your site has platform-level protection. We still advise Drupal 10 and 11 sites to update core.

## Action required

Update Drupal 10 and 11 sites to a fixed release:

* Drupal 10.x: update to 10.6.23.
* Drupal 11.3.x: update to 11.3.23.
* Drupal 11.4.x: update to 11.4.14.

Drupal 10 and 11 sites update core through Composer. To apply the update, use [one-click core updates in the Pantheon dashboard](/core-updates#apply-upstream-updates-via-the-site-dashboard).

After you update, run database updates with `drush updb` or `update.php`. This release includes a required database update.

## Drupal 7

SA-CORE-2026-019 does not affect Drupal 7. You don't need to take any action.
