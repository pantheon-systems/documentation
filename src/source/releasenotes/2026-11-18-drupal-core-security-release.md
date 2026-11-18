---
title: Drupal core security releases fix a critical remote code execution issue
published_date: "2026-11-18"
published_at: "2026-11-18T19:45:00Z"
categories: [drupal, action-required, security]
description: "Drupal 10.6.22, 11.3.22, and 11.4.13 fix two security issues in Drupal core, including a critical remote code execution issue."
---

The Drupal Security Team released Drupal 10.6.22, 11.3.22, and 11.4.13 on November 18, 2026. These releases fix two security issues in Drupal core: [SA-CORE-2026-017](https://www.drupal.org/sa-core-2026-017) and [SA-CORE-2026-018](https://www.drupal.org/sa-core-2026-018).

## Action required

Update Drupal 10 and Drupal 11 sites to a fixed release as soon as possible:

* Drupal 10.x: update to 10.6.22.
* Drupal 11.3.x: update to 11.3.22.
* Drupal 11.4.x: update to 11.4.13.

Pantheon doesn't ship an upstream update for Drupal 8 and later. You update core on your own site, for example with Composer.

Pantheon deployed protections in advance for some of the issues these releases fix. The protections do not replace the update, so update your sites as soon as possible.

Drupal 11.2.x and earlier, and Drupal 10.5.x and earlier, have reached end of life and receive no fix.

## Issues fixed

### SA-CORE-2026-017: remote code execution

Drupal rates this issue critical (18/25), and it affects Drupal 10.x before 10.6.22, Drupal 11.0.0 and later before 11.3.22, and Drupal 11.4.0 and later before 11.4.13. Drupal tracks it as CVE-2026-132165.

Under specific conditions, an attacker can use the Drupal installer (`install.php`) to attempt to reinstall Drupal. This can lead to site takeover or remote code execution.

If you can't update immediately, follow Drupal's instructions for securing the Drupal installer. Drupal also notes that some exploit paths no longer work if the web server cannot write to or change permissions on `settings.php`.

### SA-CORE-2026-018: gadget chain

Drupal rates this issue moderately critical (14/25), and it affects the same versions. Drupal tracks it as CVE-2026-132166.

Drupal core contains a chain of methods that could be exploitable if another vulnerability allows a site to deserialize untrusted data. The advisory states, "This issue is not directly exploitable."

## Drupal 7

Pantheon now provides Drupal 7.109. The advisories don't state whether Drupal 7 is affected. Tag1 Consulting prepared this core update, which removes `install.php` entirely. `drush si` continues to work.

Apply the update from your Pantheon dashboard or with Terminus. See [related documentation for how to apply core updates](/core-updates#apply-upstream-updates-via-the-site-dashboard).

For full details, see [SA-CORE-2026-017](https://www.drupal.org/sa-core-2026-017) and [SA-CORE-2026-018](https://www.drupal.org/sa-core-2026-018).
